import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xrzqmzgksnbhiukikudh.supabase.co";

export function getSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(SUPABASE_URL, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export { SUPABASE_URL };
