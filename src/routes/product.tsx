import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, Star, Minus, Plus, ShieldCheck, Truck, Leaf, Sparkles, Heart, FlaskConical, Wheat } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getFirstProduct, getDiscountPricing } from "@/lib/shopify";
import type { ShopifyVariant, DiscountPricing } from "@/lib/shopify";
import { useCart } from "@/context/cart";

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

const gallery = [
  "https://steshbutter.com/wp-content/uploads/2025/05/21-3-600x600-1.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/10-2.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/ChatGPT-Image-May-5-2025-09_03_25-PM-1-3.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-50-1.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Steshupdates-8.jpg",
  "https://steshbutter.com/wp-content/uploads/2025/05/Steshupdates-2.jpg",
  "https://steshbutter.com/wp-content/uploads/2025/05/003-KJ_Utsab-scaled.jpg",
  "https://steshbutter.com/wp-content/uploads/2025/05/104-KJ_Utsab-scaled.jpg",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-21-1-1.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-22.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-23.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-24.png",
  "https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-25.png",
];

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
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/yogurtnew.png", title: "Spread", note: "Spread it on toast, bagels and croissants" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/smoothienew.png", title: "Blend", note: "Blend into smoothies or protein shakes" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/pancake-bgnew.png", title: "Drizzle", note: "Drizzle over pancakes, yogurt or oatmeal" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/applesnew.png", title: "Dip", note: "Dip in your strawberries and apples" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/strawberrynew.png", title: "Bake", note: "Use in baking cookies and cakes" },
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
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [variants, setVariants] = useState<ShopifyVariant[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [discount, setDiscount] = useState<DiscountPricing>(null);
  const { addToCart, loading } = useCart();

  useEffect(() => {
    getFirstProduct()
      .then((p) => {
        if (p) {
          setVariants(p.variants);
          setSelectedVariantId(p.variants[0]?.id ?? null);
          if (p.variants[0]?.id) {
            getDiscountPricing(p.variants[0].id)
              .then(setDiscount)
              .catch(() => null);
          }
        }
      })
      .catch((err) => console.error("Shopify product fetch failed:", err));
  }, []);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const price = discount ? discount.discountedPrice : (selectedVariant ? parseFloat(selectedVariant.price.amount) : 19.0);
  const isOnSale = discount !== null;

  async function handleAddToCart() {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, qty);
  }

  return (
    <PageShell>
      {/* GALLERY + PURCHASE */}
      <section className="overflow-x-hidden px-4 py-6 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-warm-tan/15 aspect-4/3 md:aspect-4/5">
              <img
                src={gallery[active]}
                alt="Stesh Pistachio Butter"
                className="absolute inset-0 h-full w-full object-cover transition-all md:object-contain md:p-6"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin" }}>
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square h-11 w-11 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-16 lg:h-20 lg:w-20 ${
                    active === i ? "border-pistachio-deep" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">8 oz · Pistachio</p>
            <h1 className="mt-2 font-display text-3xl leading-tight md:mt-3 md:text-5xl md:leading-none lg:text-6xl">
              Stesh Pistachio Butter
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-1 text-pistachio-deep">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">36 reviews · Avg 5.0</span>
            </div>

            <p className="mt-4 max-w-md text-base text-muted-foreground md:mt-6 md:text-lg">
              Stesh pistachio butter is a velvety smooth butter that brings the rich taste of pistachios into every spoonful. Say goodbye to cracking shells and say hello to the newest addition to your daily routine.
            </p>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div className="mt-8">
                <p className="mb-3 text-[11px] uppercase tracking-widest-extra text-dark/60">Size</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={!v.availableForSale}
                      className={`rounded-full border px-5 py-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                        selectedVariantId === v.id
                          ? "border-pistachio-deep bg-pistachio-light/20 text-pistachio-deep font-medium"
                          : "border-border hover:border-pistachio-deep"
                      }`}
                    >
                      {v.title}
                      {!v.availableForSale && " — Sold out"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3 md:mt-8">
              <div className="font-display text-3xl md:text-4xl">${price.toFixed(2)}</div>
              {isOnSale && (
                <>
                  <div className="font-display text-xl text-muted-foreground line-through md:text-2xl">${discount!.originalPrice.toFixed(2)}</div>
                  <div className="border-b border-pistachio-deep pb-0.5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
                    {discount!.pctOff}% off
                  </div>
                </>
              )}
            </div>

            {/* Qty + ATC */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-6">
              <div className="flex w-fit items-center rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={loading || !selectedVariant}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-pistachio-deep px-5 py-4 text-[11px] uppercase tracking-wide text-cream transition-all hover:bg-dark disabled:opacity-60 disabled:cursor-not-allowed sm:flex-1 sm:px-8 sm:tracking-widest-extra"
              >
                {loading ? "Adding…" : `Add to Cart · $${(price * qty).toFixed(2)}`}
                {!loading && <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </div>

            <a
              href="https://www.amazon.com/dp/B0F9586XQ5"
              className="mt-3 text-center text-xs text-muted-foreground hover:text-pistachio-deep"
            >
              Or buy on Amazon →
            </a>

            {/* Badges */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-8 md:grid-cols-5">
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
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
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
                  <img src={u.img} alt={u.title} className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110" loading="lazy" decoding="async" />
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
