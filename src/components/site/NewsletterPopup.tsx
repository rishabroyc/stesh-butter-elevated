import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { subscribeEmail } from "@/lib/newsletter";

const STORAGE_KEY = "stesh_newsletter";
const DISMISS_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const DELAY_MS = 4000;

function shouldShow() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    if (raw === "subscribed") return false;
    const { at } = JSON.parse(raw);
    return Date.now() - at > DISMISS_TTL_MS;
  } catch {
    return true;
  }
}

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now() }));
    } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeEmail(email, "popup");
      setStatus("success");
      try { localStorage.setItem(STORAGE_KEY, "subscribed"); } catch {}
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-dark/50 backdrop-blur-sm"
        onClick={status !== "success" ? dismiss : undefined}
      />

      <div className="fixed inset-x-4 bottom-4 z-[91] mx-auto max-w-md md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl bg-cream shadow-2xl">

          {/* Top pistachio strip */}
          <div className="h-1.5 w-full bg-pistachio-deep" />

          <div className="p-8 md:p-10">
            {status === "success" ? (
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-pistachio-light/40 text-pistachio-deep">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-display text-4xl">You're in.</h3>
                <p className="mt-3 text-muted-foreground">
                  Use code <span className="font-semibold text-pistachio-deep">WELCOME10</span> at checkout for 10% off your first order.
                </p>
                <button
                  onClick={() => setVisible(false)}
                  className="mt-7 w-full rounded-full bg-pistachio-deep py-4 text-[11px] uppercase tracking-widest-extra text-cream hover:bg-dark"
                >
                  Start shopping →
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={dismiss}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full p-1.5 text-dark/30 transition-colors hover:text-dark"
                >
                  <X className="h-4 w-4" />
                </button>

                <p className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">For you</p>
                <h3 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                  10% off your<br />first order.
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Drop your email and we'll send your discount right away — plus recipes and updates from Arsh & Utsab.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-full border border-border bg-off-white px-6 py-4 text-sm outline-none focus:border-pistachio-deep"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-pistachio-deep py-4 text-[11px] uppercase tracking-widest-extra text-cream transition-colors hover:bg-dark disabled:opacity-60"
                  >
                    {status === "loading" ? "Subscribing…" : "Claim 10% off →"}
                  </button>
                  {status === "error" && (
                    <p className="text-center text-xs text-red-500">Something went wrong — please try again.</p>
                  )}
                </form>

                <button
                  onClick={dismiss}
                  className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-dark"
                >
                  No thanks, I'll pay full price
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
