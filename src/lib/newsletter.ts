import { getSupabaseClient } from "@/lib/supabase";

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

  const { error } = await getClient()
    .from("email_subscribers")
    .insert({ email, source });

  // 23505 = unique_violation — duplicate email, treat as success
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
}
