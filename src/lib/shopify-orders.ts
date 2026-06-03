import { createServerFn } from "@tanstack/react-start";

const DOMAIN = "stesh-butter.myshopify.com";
const API_VERSION = "2025-01";

type AdminLineItem = {
  name: string;
  quantity: number;
  price: string;
};

type AdminFulfillment = {
  tracking_number: string | null;
  tracking_url: string | null;
  status: string;
};

type AdminOrder = {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  line_items: AdminLineItem[];
  fulfillments: AdminFulfillment[];
};

export type NormalizedOrder = {
  id: string;
  order_number: string;
  created_at: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total_cents: number;
  items: { name: string; quantity: number; price_cents: number }[];
  tracking_number: string | null;
  tracking_url: string | null;
};

function deriveStatus(o: AdminOrder): NormalizedOrder["status"] {
  if (o.financial_status === "refunded" || o.financial_status === "voided") return "cancelled";
  if (o.fulfillment_status === "fulfilled") return "delivered";
  return "processing";
}

function normalize(o: AdminOrder): NormalizedOrder {
  const tracking = o.fulfillments?.[0] ?? null;
  return {
    id: String(o.id),
    order_number: o.name,
    created_at: o.created_at,
    status: deriveStatus(o),
    total_cents: Math.round(parseFloat(o.total_price) * 100),
    items: o.line_items.map((li) => ({
      name: li.name,
      quantity: li.quantity,
      price_cents: Math.round(parseFloat(li.price) * 100),
    })),
    tracking_number: tracking?.tracking_number ?? null,
    tracking_url: tracking?.tracking_url ?? null,
  };
}

export const fetchOrdersByEmail = createServerFn()
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!token || token === "your_admin_token_here") return [] as NormalizedOrder[];

    const base = `https://${DOMAIN}/admin/api/${API_VERSION}`;
    const headers = {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
    };

    const searchRes = await fetch(
      `${base}/customers/search.json?query=email:${encodeURIComponent(email)}&limit=1`,
      { headers },
    );
    if (!searchRes.ok) return [] as NormalizedOrder[];

    const { customers } = (await searchRes.json()) as { customers: Array<{ id: number }> };
    if (!customers?.length) return [] as NormalizedOrder[];

    const ordersRes = await fetch(
      `${base}/customers/${customers[0].id}/orders.json?status=any&limit=25`,
      { headers },
    );
    if (!ordersRes.ok) return [] as NormalizedOrder[];

    const { orders } = (await ordersRes.json()) as { orders: AdminOrder[] };
    return orders.map(normalize);
  });
