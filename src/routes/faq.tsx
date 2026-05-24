import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";

const sections: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Product",
    items: [
      { q: "What's in it?", a: "Pistachios, almond protein powder, avocado oil, organic powdered cane sugar, and sunflower lecithin. That's the entire ingredient list." },
      { q: "Is it vegan?", a: "Yes. Stesh is 100% plant-based — no dairy, no honey, no animal products of any kind." },
      { q: "Does it contain seed oils?", a: "Never. We use avocado oil exclusively. No canola, sunflower, soybean, vegetable, or palm." },
      { q: "How much protein per serving?", a: "Around 6g, thanks to the almond protein powder we blend in." },
      { q: "Is it gluten-free?", a: "Yes — all ingredients are naturally gluten-free." },
      { q: "Allergens?", a: "Contains pistachios and almonds. Produced in a facility that handles other tree nuts." },
    ],
  },
  {
    title: "Storage & Shelf life",
    items: [
      { q: "Do I need to refrigerate?", a: "Not required, but we recommend it after opening for the freshest flavor and texture." },
      { q: "How long does an opened jar last?", a: "4–6 weeks stored in a cool spot. Probably less if you're like Monika from Portland." },
      { q: "Why does mine separate?", a: "No stabilizers means a little natural oil separation can happen. Stir gently before the first use." },
    ],
  },
  {
    title: "Shipping & Returns",
    items: [
      { q: "How fast does it ship?", a: "Orders ship within 1 business day and arrive in 2–3 days via standard shipping." },
      { q: "Do you offer free shipping?", a: "Yes — on all U.S. orders over $40." },
      { q: "Do you ship internationally?", a: "Not yet, but it's on the roadmap. Sign up for the newsletter to be the first to know." },
      { q: "What's your return policy?", a: "Love it or your money back, within 30 days. Email hello@steshbutter.com." },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      { q: "How does Subscribe & Save work?", a: "Choose your cadence (every 2, 4, or 8 weeks), save 15% on every shipment, skip or cancel anytime." },
      { q: "Can I skip a shipment?", a: "Yes — manage everything from your account, no emails required." },
      { q: "Can I cancel anytime?", a: "Always. No fees, no questions." },
    ],
  },
];

const allFaqs = sections.flatMap((s) => s.items);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Stesh" },
      { name: "description", content: "Common questions about Stesh Pistachio Butter — ingredients, shipping, subscriptions, and more." },
      { property: "og:title", content: "FAQ — Stesh" },
      { property: "og:description", content: "Everything you wanted to know about Stesh." },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [open, setOpen] = useState<string | null>("Product-0");
  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <em className="not-italic text-pistachio-deep">answered.</em></>}
        subtitle="Don't see what you're looking for? Email hello@steshbutter.com — we read every message."
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-[900px] space-y-16">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="mb-6 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
                {sec.title}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-off-white">
                {sec.items.map((f, i) => {
                  const id = `${sec.title}-${i}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="border-b border-border last:border-0">
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                      >
                        <span className="font-display text-xl md:text-2xl">{f.q}</span>
                        <span className="text-2xl text-pistachio-deep">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <p className="px-6 pb-6 text-muted-foreground md:px-8">{f.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-pistachio-deep p-10 text-center text-cream md:p-14">
            <h2 className="font-display text-4xl md:text-5xl">Still curious?</h2>
            <p className="mt-3 text-cream/70">Mr. Turtle is a slow typer but Arsh & Utsab are quick.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="mailto:hello@steshbutter.com" className="rounded-full bg-cream px-8 py-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep hover:bg-pistachio-light">
                Email us
              </a>
              <Link to="/product" className="rounded-full border border-cream/40 px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream hover:bg-cream/10">
                Shop Stesh →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
