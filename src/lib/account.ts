import { createServerFn } from "@tanstack/react-start";
import { getSupabaseAdminClient } from "./supabase-admin";

// Deletes the signed-in user's account: their app data (profile, subscriptions)
// plus the underlying Supabase auth user itself. Irreversible.
//
// The access token is the only proof of identity we get here — this runs with
// the service-role key, so we verify the token belongs to a real, current
// session before touching anything, rather than trusting a client-supplied id.
export const deleteAccount = createServerFn({ method: "POST" })
  .validator((accessToken: string) => accessToken)
  .handler(async ({ data: accessToken }) => {
    const admin = getSupabaseAdminClient();

    const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
    if (userError || !userData.user) {
      throw new Error("Not authenticated");
    }
    const userId = userData.user.id;

    const { error: subsError } = await admin.from("subscriptions").delete().eq("user_id", userId);
    if (subsError) {
      throw new Error(`Failed to remove subscriptions: ${subsError.message}`);
    }

    const { error: profileError } = await admin.from("profiles").delete().eq("id", userId);
    if (profileError) {
      throw new Error(`Failed to remove profile: ${profileError.message}`);
    }

    // Best-effort: the newsletter list is keyed by email, not user id, so it's
    // not tied to account integrity the way the rows above are. Don't block
    // account deletion if this fails.
    if (userData.user.email) {
      const { error: subscriberError } = await admin
        .from("email_subscribers")
        .delete()
        .eq("email", userData.user.email);
      if (subscriberError) {
        console.error(
          "[account] Failed to remove newsletter subscription:",
          subscriberError.message,
        );
      }
    }

    const { error: authError } = await admin.auth.admin.deleteUser(userId);
    if (authError) {
      throw new Error(`Failed to delete account: ${authError.message}`);
    }

    return { success: true } as const;
  });
