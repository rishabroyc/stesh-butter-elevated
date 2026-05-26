import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(url, key);

export async function subscribeEmail(email: string, source: "popup" | "homepage" | "footer" = "popup") {
  if (!url || url.includes("YOUR_PROJECT")) {
    console.warn("Supabase not configured — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env");
    return;
  }

  const { error } = await supabase.from("email_subscribers").insert({ email, source });

  // 23505 = unique_violation — duplicate email, treat as success so UX stays positive
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
}
