import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { User, Package, ChevronDown, Loader2, LogOut } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/context/auth";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

type Subscription = {
  id: string;
  product_name: string;
  variant_name: string | null;
  cadence_weeks: 2 | 4 | 8;
  status: "active" | "paused" | "cancelled" | "pending_payment";
  next_shipment_date: string | null;
  price_cents: number | null;
  discount_percent: number;
  created_at: string;
};


const cadenceLabels: Record<2 | 4 | 8, string> = {
  2: "Every 2 weeks",
  4: "Every 4 weeks",
  8: "Every 8 weeks",
};

function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subsLoading, setSubsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "subscriptions">("profile");
  const [changingCadence, setChangingCadence] = useState<string | null>(null);
  const didRedirect = useRef(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    if (loading) return;
    if (!user && !didRedirect.current) {
      didRedirect.current = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: "/auth" as any, search: { redirect: "/profile" } as any });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name ?? "",
        phone: profile.phone ?? "",
        address_line1: profile.address_line1 ?? "",
        address_line2: profile.address_line2 ?? "",
        city: profile.city ?? "",
        state: profile.state ?? "",
        zip: profile.zip ?? "",
      });
    }
  }, [profile, form]);

  useEffect(() => {
    if (!user) return;
    loadSubscriptions();
  }, [user]);

  async function loadSubscriptions() {
    if (!user) return;
    setSubsLoading(true);
    const { data } = await getSupabaseClient()
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["active", "paused"])
      .order("created_at", { ascending: false });
    setSubscriptions((data as Subscription[]) ?? []);
    setSubsLoading(false);
  }

  async function onSaveProfile(values: z.infer<typeof profileSchema>) {
    if (!user) return;
    const { error } = await getSupabaseClient()
      .from("profiles")
      .upsert({ id: user.id, ...values, updated_at: new Date().toISOString() });
    if (error) {
      toast.error("Failed to save profile. Please try again.");
    } else {
      await refreshProfile();
      toast.success("Profile saved.");
    }
  }

  async function updateSubStatus(id: string, status: "active" | "paused" | "cancelled") {
    const { error } = await getSupabaseClient()
      .from("subscriptions")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update subscription.");
    } else {
      await loadSubscriptions();
      const msg =
        status === "cancelled"
          ? "Subscription cancelled."
          : status === "paused"
            ? "Subscription paused."
            : "Subscription resumed.";
      toast.success(msg);
    }
  }

  async function updateCadence(id: string, cadence: 2 | 4 | 8) {
    const { error } = await getSupabaseClient()
      .from("subscriptions")
      .update({ cadence_weeks: cadence, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update delivery frequency.");
    } else {
      setChangingCadence(null);
      await loadSubscriptions();
      toast.success("Delivery frequency updated.");
    }
  }

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-pistachio-deep" />
        </div>
      </PageShell>
    );
  }

  if (!user) return null;

  const activeSubCount = subscriptions.filter((s) => s.status === "active").length;

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Account</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">
              Hi, {profile?.name?.split(" ")[0] || "there"}.
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] uppercase tracking-widest-extra text-dark/60 transition-all hover:border-dark hover:text-dark"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-1 border-b border-border">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 pb-3 pr-6 text-[11px] uppercase tracking-widest-extra transition-all ${
              activeTab === "profile"
                ? "border-b-2 border-pistachio-deep text-pistachio-deep"
                : "text-dark/40 hover:text-dark/70"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`flex items-center gap-2 pb-3 pr-6 text-[11px] uppercase tracking-widest-extra transition-all ${
              activeTab === "subscriptions"
                ? "border-b-2 border-pistachio-deep text-pistachio-deep"
                : "text-dark/40 hover:text-dark/70"
            }`}
          >
            <Package className="h-3.5 w-3.5" />
            Subscriptions
            {activeSubCount > 0 && (
              <span className="rounded-full bg-pistachio-deep px-1.5 py-0.5 text-[9px] text-cream">
                {activeSubCount}
              </span>
            )}
          </button>
        </div>

        {/* ─── Profile Tab ─── */}
        {activeTab === "profile" && (
          <form onSubmit={form.handleSubmit(onSaveProfile)} className="mt-10 max-w-xl space-y-5">
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                Full Name
              </label>
              <input
                {...form.register("name")}
                className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                placeholder="Your name"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Email
                </label>
                <input
                  value={user.email ?? ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-border bg-off-white/70 px-4 py-3 text-sm text-muted-foreground outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Phone
                </label>
                <input
                  {...form.register("phone")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                Address
              </label>
              <input
                {...form.register("address_line1")}
                className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <input
                {...form.register("address_line2")}
                className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                placeholder="Apt, suite, unit (optional)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  City
                </label>
                <input
                  {...form.register("city")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  State
                </label>
                <input
                  {...form.register("state")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  ZIP
                </label>
                <input
                  {...form.register("zip")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="10001"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex items-center gap-2 rounded-full bg-pistachio-deep px-8 py-3.5 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark disabled:opacity-60"
            >
              {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </button>
          </form>
        )}

        {/* ─── Subscriptions Tab ─── */}
        {activeTab === "subscriptions" && (
          <div className="mt-10">
            {subsLoading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading subscriptions…
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="rounded-2xl border border-border bg-off-white p-12 text-center">
                <Package className="mx-auto h-12 w-12 text-pistachio-deep/30" />
                <h3 className="mt-4 font-display text-2xl">No active subscriptions</h3>
                <p className="mt-2 text-muted-foreground">
                  Subscribe & Save 15% on every delivery of Stesh Pistachio Butter.
                </p>
                <Link
                  to="/product"
                  className="mt-6 inline-block rounded-full bg-pistachio-deep px-8 py-3.5 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark"
                >
                  Shop Now →
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="rounded-2xl border border-border bg-cream p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl">{sub.product_name}</h3>
                        {sub.variant_name && (
                          <p className="text-sm text-muted-foreground">{sub.variant_name}</p>
                        )}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${
                          sub.status === "active"
                            ? "bg-pistachio-light/40 text-pistachio-deep"
                            : "bg-warm-tan/20 text-warm-tan"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Frequency
                        </p>
                        {changingCadence === sub.id ? (
                          <div className="mt-1.5 flex gap-2">
                            {([2, 4, 8] as const).map((w) => (
                              <button
                                key={w}
                                onClick={() => updateCadence(sub.id, w)}
                                className={`rounded-full border px-2.5 py-1 text-[10px] transition-all ${
                                  sub.cadence_weeks === w
                                    ? "border-pistachio-deep bg-pistachio-light/20 text-pistachio-deep"
                                    : "border-border hover:border-pistachio-deep"
                                }`}
                              >
                                {w}wk
                              </button>
                            ))}
                            <button
                              onClick={() => setChangingCadence(null)}
                              className="text-[10px] text-muted-foreground hover:text-dark"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setChangingCadence(sub.id)}
                            className="mt-1 flex items-center gap-1 font-medium hover:text-pistachio-deep"
                          >
                            {cadenceLabels[sub.cadence_weeks]}
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Next Shipment
                        </p>
                        <p className="mt-1 font-medium">
                          {sub.next_shipment_date
                            ? format(new Date(sub.next_shipment_date), "MMM d, yyyy")
                            : `${sub.cadence_weeks} weeks from order date`}
                        </p>
                      </div>

                      {sub.price_cents !== null && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            Price / order
                          </p>
                          <p className="mt-1 font-medium">
                            ${(sub.price_cents / 100).toFixed(2)}{" "}
                            <span className="text-pistachio-deep">· {sub.discount_percent}% off</span>
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Subscribed
                        </p>
                        <p className="mt-1 font-medium">
                          {format(new Date(sub.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2 border-t border-border pt-4">
                      {sub.status === "active" ? (
                        <button
                          onClick={() => updateSubStatus(sub.id, "paused")}
                          className="rounded-full border border-border px-4 py-2 text-[10px] uppercase tracking-wider transition-all hover:border-dark"
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubStatus(sub.id, "active")}
                          className="rounded-full border border-pistachio-deep bg-pistachio-light/10 px-4 py-2 text-[10px] uppercase tracking-wider text-pistachio-deep transition-all hover:bg-pistachio-light/20"
                        >
                          Resume
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (window.confirm("Cancel this subscription? This can't be undone.")) {
                            updateSubStatus(sub.id, "cancelled");
                          }
                        }}
                        className="rounded-full border border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground transition-all hover:border-red-300 hover:text-red-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}
