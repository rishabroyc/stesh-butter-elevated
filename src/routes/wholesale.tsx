import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale — Stesh" },
      { name: "description", content: "Carry Stesh Pistachio Butter in your store, cafe, or hotel. Wholesale inquiries welcome." },
      { property: "og:title", content: "Wholesale — Stesh" },
      { property: "og:description", content: "Bring Stesh to your shelf." },
    ],
  }),
  component: WholesalePage,
});

function WholesalePage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageShell>
      <PageHero
        eyebrow="Wholesale · B2B"
        title={<>Bring Stesh to <em className="not-italic text-pistachio-deep">your shelf.</em></>}
        subtitle="We partner with specialty grocers, cafes, gyms, hotels, and gift shops. Tell us about your business and we'll be in touch within 48 hours."
      />

      {/* Partner platforms */}
      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-[1200px] space-y-12">

          {/* Faire */}
          <div className="rounded-2xl border border-border bg-off-white p-6 md:p-10">
            <p className="mb-2 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Order via Faire</p>
            <h2 className="mb-6 font-display text-3xl">Shop on Faire</h2>
            <div className="overflow-hidden rounded-xl">
              <iframe
                src="https://www.faire.com/embed/bw_ux5auhqbbs"
                scrolling="no"
                style={{ margin: "0 auto", border: "none", display: "block", maxWidth: "100%", width: "900px", height: "600px" }}
                title="Stesh on Faire"
              />
            </div>
          </div>

          {/* Stack */}
          <div className="rounded-2xl border border-border bg-off-white p-6 md:p-10">
            <p className="mb-2 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Order via Stack</p>
            <h2 className="mb-6 font-display text-3xl">Shop on Stack</h2>
            <div className="overflow-hidden rounded-xl">
              <iframe
                src="https://stack-backend.onrender.com/widget/embed/1e4726f6-e309-44d0-9738-e4bb8d53a130"
                scrolling="no"
                width="100%"
                height="600"
                style={{ border: "none" }}
                title="Stesh on Stack"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Perks + inquiry form */}
      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl">Why partner with Stesh</h2>
            <ul className="mt-8 space-y-6 text-muted-foreground">
              {[
                ["High-margin SKU", "Premium pistachio category, fast-growing."],
                ["Beautiful merchandising", "POS kits, recipe cards, jar-front shelf talkers."],
                ["Trade terms", "Net-30 for qualified accounts. Reorders ship in 5 days."],
                ["Minimum order", "1 case (12 jars). MOQ-friendly for first orders."],
              ].map(([t, d]) => (
                <li key={t}>
                  <div className="font-display text-xl text-dark">{t}</div>
                  <div className="mt-1 text-sm">{d}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-pistachio-deep/20 bg-pistachio-light/20 p-10 text-center">
                <h3 className="font-display text-4xl text-pistachio-deep">Thank you.</h3>
                <p className="mt-4 text-muted-foreground">
                  We'll be in touch within 48 hours. In the meantime, Mr. Turtle says hi.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="rounded-2xl border border-border bg-off-white p-8 md:p-10"
              >
                <h3 className="font-display text-3xl">Other wholesale inquiry</h3>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {[
                    ["Business name", "name", "text"],
                    ["Your name", "contact", "text"],
                    ["Email", "email", "email"],
                    ["City / State", "city", "text"],
                  ].map(([label, name, type]) => (
                    <label key={name} className="block">
                      <span className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">{label}</span>
                      <input
                        name={name}
                        type={type}
                        required
                        className="mt-2 w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-pistachio-deep"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-5 block">
                  <span className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Tell us about your store</span>
                  <textarea
                    rows={5}
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-pistachio-deep"
                  />
                </label>
                <button className="mt-8 w-full rounded-full bg-pistachio-deep px-10 py-5 text-[11px] uppercase tracking-widest-extra text-cream transition-colors hover:bg-dark">
                  Send inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
