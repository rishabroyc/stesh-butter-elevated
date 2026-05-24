import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ExternalLink } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/where-to-buy")({
  head: () => ({
    meta: [
      { title: "Where to Buy — Stesh" },
      { name: "description", content: "Buy Stesh Pistachio Butter direct, on Amazon, or at a retailer near you." },
      { property: "og:title", content: "Where to Buy Stesh" },
      { property: "og:description", content: "Find Stesh online or in stores." },
    ],
  }),
  component: WhereToBuyPage,
});

const online = [
  { name: "steshbutter.com", note: "Ships direct in 2–3 days. Free over $40.", href: "https://steshbutter.com" },
  { name: "Amazon", note: "Prime eligible — ASIN B0F9586XQ5", href: "https://www.amazon.com/dp/B0F9586XQ5" },
];

const locations = [
  { name: "Foxtrot Market", city: "New York, NY", neighborhood: "SoHo" },
  { name: "Erewhon", city: "Los Angeles, CA", neighborhood: "Venice" },
  { name: "Bristol Farms", city: "San Francisco, CA", neighborhood: "Pacific Heights" },
  { name: "Fairway Market", city: "New York, NY", neighborhood: "Upper West Side" },
  { name: "Pop Up Grocer", city: "Austin, TX", neighborhood: "South Congress" },
  { name: "Local Choice", city: "Portland, OR", neighborhood: "Pearl District" },
];

function WhereToBuyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Where to Buy"
        title={<>Find Stesh <em className="not-italic text-pistachio-deep">near you.</em></>}
        subtitle="Order direct, grab it on Amazon, or pick up a jar at a stockist near you. New retail partners added monthly."
      />

      {/* Online */}
      <section className="px-6 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-8 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
            Online
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {online.map((o) => (
              <a
                key={o.name}
                href={o.href}
                className="group flex items-center justify-between rounded-2xl border border-border bg-off-white p-8 transition-all hover:-translate-y-1 hover:border-pistachio-deep"
              >
                <div>
                  <h3 className="font-display text-3xl">{o.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.note}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-pistachio-deep transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Retail */}
      <section className="bg-off-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl leading-[1] md:text-6xl">
              In stores.
            </h2>
            <p className="text-[11px] uppercase tracking-widest-extra text-muted-foreground">
              {locations.length} stockists & growing
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {locations.map((l) => (
              <div key={`${l.name}-${l.city}`} className="flex items-start gap-4 rounded-xl bg-cream p-6">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pistachio-light/40 text-pistachio-deep">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-2xl">{l.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {l.neighborhood} · {l.city}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-pistachio-deep/20 bg-pistachio-light/20 p-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl">
              Want Stesh in your store?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              We work with cafes, grocers, and gift shops nationwide.
            </p>
            <a
              href="/wholesale"
              className="mt-6 inline-block rounded-full bg-pistachio-deep px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream hover:bg-dark"
            >
              Wholesale inquiries →
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
