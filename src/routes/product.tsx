import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Star, Minus, Plus, ShieldCheck, Truck, Leaf, Sparkles, Heart, FlaskConical, Wheat } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import productSpoon from "@/assets/product-spoon.jpg";
import heroJar from "@/assets/hero-jar.jpg";
import useToast from "@/assets/use-toast.jpg";
import useSmoothie from "@/assets/use-smoothie.jpg";
import usePancakes from "@/assets/use-pancakes.jpg";
import useDip from "@/assets/use-dip.jpg";
import useBake from "@/assets/use-bake.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Stesh Pistachio Butter — $19.00 | Stesh" },
      { name: "description", content: "Stesh Pistachio Butter: 5 clean ingredients, vegan, no seed oils, prebiotic, protein-forward. $19. Subscribe & Save 15%." },
      { property: "og:title", content: "Stesh Pistachio Butter" },
      { property: "og:description", content: "5 ingredients. Zero compromise. Indulge by the spoonful." },
      { property: "og:type", content: "product" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Stesh Pistachio Butter",
        description: "Premium pistachio butter made with 5 clean ingredients.",
        brand: { "@type": "Brand", name: "Stesh" },
        offers: { "@type": "Offer", price: "19.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "36" },
      }),
    }],
  }),
  component: ProductPage,
});

const gallery = [productSpoon, heroJar, useToast, useSmoothie];

const ingredients = [
  { name: "Pistachios", note: "Rich in healthy fats & antioxidants" },
  { name: "Almond Protein Powder", note: "6g of clean protein per serving" },
  { name: "Avocado Oil", note: "Heart-healthy. Zero seed oils." },
  { name: "Organic Cane Sugar", note: "Lightly sweetened. Nothing artificial." },
  { name: "Sunflower Lecithin", note: "Natural emulsifier for silky texture" },
];

const badges = [
  { icon: Leaf, label: "Vegan" },
  { icon: Sparkles, label: "No Seed Oils" },
  { icon: FlaskConical, label: "Prebiotic" },
  { icon: Heart, label: "Protein-Forward" },
  { icon: Wheat, label: "5 Ingredients" },
];

const useImages = [
  { img: useToast, title: "Spread", note: "Toast, bagels, croissants" },
  { img: useSmoothie, title: "Blend", note: "Smoothies & shakes" },
  { img: usePancakes, title: "Drizzle", note: "Pancakes, oats, yogurt" },
  { img: useDip, title: "Dip", note: "Strawberries & apples" },
  { img: useBake, title: "Bake", note: "Cookies, cakes, swirls" },
];

const faqs = [
  { q: "Is it vegan?", a: "Yes. Stesh is 100% plant-based — no dairy, no honey, no animal products." },
  { q: "Does it contain seed oils?", a: "Never. We use avocado oil, full stop. No canola, sunflower, soybean, or palm." },
  { q: "How much protein?", a: "Roughly 6g per serving, thanks to the almond protein powder we blend in." },
  { q: "How long does an opened jar last?", a: "Stored in a cool spot, about 4–6 weeks once opened. You probably won't make it that long." },
  { q: "Can I bake with it?", a: "Absolutely. It's gorgeous swirled into cookies, banana bread, brownies, and croissants." },
  { q: "How is it different from almond butter?", a: "Real pistachio flavor, lower sugar, added protein, and avocado oil instead of seed oils." },
];

function ProductPage() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"one" | "sub">("one");
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const price = mode === "sub" ? 16.15 : 19.0;

  return (
    <PageShell>
      {/* GALLERY + PURCHASE */}
      <section className="px-6 py-10 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-warm-tan/15">
              <img
                src={gallery[active]}
                alt="Stesh Pistachio Butter"
                className="h-full w-full object-cover"
                width={1280}
                height={1600}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    active === i ? "border-pistachio-deep" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">10 oz · Pistachio</p>
            <h1 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">
              Stesh Pistachio Butter
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-1 text-pistachio-deep">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">36 reviews · Avg 5.0</span>
            </div>

            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Say goodbye to cracking shells. Rich pistachio flavor with zero guilt and clean, powerful ingredients — designed for those who crave both wellness and indulgence in every bite.
            </p>

            {/* Mode toggle */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("one")}
                className={`rounded-xl border p-4 text-left transition-all ${
                  mode === "one" ? "border-pistachio-deep bg-pistachio-light/20" : "border-border"
                }`}
              >
                <div className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">One-time</div>
                <div className="mt-1 font-display text-2xl">$19.00</div>
              </button>
              <button
                onClick={() => setMode("sub")}
                className={`rounded-xl border p-4 text-left transition-all ${
                  mode === "sub" ? "border-pistachio-deep bg-pistachio-light/20" : "border-border"
                }`}
              >
                <div className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Subscribe · Save 15%</div>
                <div className="mt-1 font-display text-2xl">$16.15</div>
              </button>
            </div>

            {/* Qty + ATC */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button className="group flex flex-1 items-center justify-center gap-3 rounded-full bg-pistachio-deep px-8 py-5 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark">
                Add to Cart · ${(price * qty).toFixed(2)}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <a
              href="https://www.amazon.com/dp/B0F9586XQ5"
              className="mt-4 text-center text-xs text-muted-foreground hover:text-pistachio-deep"
            >
              Or buy on Amazon →
            </a>

            {/* Badges */}
            <div className="mt-10 grid grid-cols-5 gap-3 border-t border-border pt-8">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pistachio-light/40 text-pistachio-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-dark/70">{label}</span>
                </div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure checkout</span>
              <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping over $40</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Ships in 2–3 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="bg-off-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
            5 ingredients. That's the whole list.
          </p>
          <h2 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            Everything that's in it. <em className="not-italic text-pistachio-deep">Nothing that isn't.</em>
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {ingredients.map((ing, i) => (
              <article key={ing.name} className="flex flex-col rounded-2xl bg-cream p-6">
                <span className="font-display text-5xl text-pistachio-deep/30">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight">{ing.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{ing.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WAYS TO ENJOY */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-5xl leading-[1] md:text-7xl">
            Ways to <em className="not-italic text-pistachio-deep">enjoy it.</em>
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {useImages.map((u) => (
              <div key={u.title}>
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-cream">
                  <img src={u.img} alt={u.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                </div>
                <h3 className="mt-3 font-display text-xl">{u.title}</h3>
                <p className="text-sm text-muted-foreground">{u.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">FAQ</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Quick answers.
            </h2>
            <Link to="/faq" className="mt-6 inline-block border-b border-pistachio-deep pb-1 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              See all FAQs →
            </Link>
          </div>
          <div className="md:col-span-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                  <span className="text-2xl text-pistachio-deep">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-muted-foreground">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
