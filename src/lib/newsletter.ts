import { getSupabaseClient } from "@/lib/supabase";
import { emailSchema } from "@/lib/validation";

function getClient() {
  return getSupabaseClient();
}

export async function subscribeEmail(
  email: string,
  source: "popup" | "homepage" | "footer" = "popup",
) {
  const url = import.meta.env.VITE_SUPABASE_URL as string;
  if (!url || url.includes("YOUR_PROJECT")) {
    console.warn("Supabase not configured");
    return;
  }

  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Enter a valid email");
  }

  const { error } = await getClient()
    .from("email_subscribers")
    .insert({ email: parsed.data, source });

  // 23505 = unique_violation (duplicate email), treat as success
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
}
