import { getSupabaseAdminClient, SUPABASE_URL } from "./supabase-admin";

type ShopifyOrderPayload = {
  email?: string;
  customer?: { email?: string };
};

async function verifyShopifyWebhook(
  rawBody: string,
  hmacHeader: string,
  secret: string,
): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const computed = btoa(String.fromCharCode(...new Uint8Array(sig)));

  // Timing-safe comparison to prevent timing attacks
  if (computed.length !== hmacHeader.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ hmacHeader.charCodeAt(i);
  }
  return diff === 0;
}

async function getUserIdByEmail(
  email: string,
  serviceKey: string,
): Promise<string | null> {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}&page=1&per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    },
  );
  if (!res.ok) return null;
  const body = (await res.json()) as { users?: Array<{ id: string }> };
  return body.users?.[0]?.id ?? null;
}

export async function handleShopifyOrdersPaid(request: Request): Promise<Response> {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") ?? "";

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] SHOPIFY_WEBHOOK_SECRET not configured");
    return new Response("Configuration error", { status: 500 });
  }

  const valid = await verifyShopifyWebhook(rawBody, hmacHeader, secret);
  if (!valid) {
    console.warn("[webhook] Invalid HMAC signature — rejecting request");
    return new Response("Unauthorized", { status: 401 });
  }

  let order: ShopifyOrderPayload;
  try {
    order = JSON.parse(rawBody) as ShopifyOrderPayload;
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const email = order.customer?.email ?? order.email;
  if (!email) return new Response("OK", { status: 200 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("[webhook] SUPABASE_SERVICE_ROLE_KEY not configured");
    return new Response("Configuration error", { status: 500 });
  }

  const userId = await getUserIdByEmail(email, serviceKey);
  if (!userId) {
    // Customer not in our system — not an error
    return new Response("OK", { status: 200 });
  }

  const admin = getSupabaseAdminClient();
  const { error } = await admin
    .from("subscriptions")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "pending_payment");

  if (error) {
    console.error("[webhook] Failed to confirm subscriptions:", error.message);
    return new Response("Internal error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
