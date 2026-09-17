import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import shopPailImg from "@/assets/Website Pictures/Shop page/shop-pail.png";
import shopImg021 from "@/assets/Website Pictures/Shop page/021 - KJ_Utsab.jpg";
import shopImg011 from "@/assets/Website Pictures/Shop page/011 - KJ_Utsab.jpg";
import shopUpdates3 from "@/assets/Website Pictures/Shop page/Steshupdates-3.jpg";
import shopUpdates8 from "@/assets/Website Pictures/Shop page/Steshupdates-8.jpg";
import shopNutritionFacts from "@/assets/Website Pictures/Shop page/Nutrition facts - make this the last photo.jpg";
import useToastImg from "@/assets/use-toast.jpg";
import useSmoothieImg from "@/assets/use-smoothie.jpg";
import usePancakesImg from "@/assets/use-pancakes.jpg";
import useDipImg from "@/assets/use-dip.jpg";
import useBakeImg from "@/assets/use-bake.jpg";
import { useState, useEffect, useRef } from "react";
import {
  Check,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Leaf,
  Sparkles,
  Heart,
  FlaskConical,
  Wheat,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/site/PageShell";
import { getFirstProduct, getDiscountPricing } from "@/lib/shopify";
import type { ShopifyVariant, ShopifyProduct, DiscountPricing } from "@/lib/shopify";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { getSupabaseClient } from "@/lib/supabase";

const PENDING_SUB_KEY = "stesh_pending_sub";

// Shown on pre-order variants (inventory 0 + "continue selling when out of stock").
// Edit this string when the pre-order ship window changes.
const PREORDER_SHIP_ESTIMATE = "Ships by early October";

// Option rows render in this order on the product page; anything else follows.
const OPTION_ORDER = ["flavor", "size"];
function optionRank(name: string) {
  const i = OPTION_ORDER.indexOf(name.toLowerCase());
  return i === -1 ? OPTION_ORDER.length : i;
}

type PendingSub = {
  variantId: string;
  variantName: string;
  cadenceWeeks: 2 | 4 | 8;
  priceCents: number;
};

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Stesh Pistachio Butter ($19.00) | Stesh" },
      {
        name: "description",
        content:
          "Stesh Pistachio Butter: 5 clean ingredients, vegan, no seed oils, prebiotic fiber, protein-forward. $19. Subscribe & Save 15%.",
      },
      { property: "og:title", content: "Stesh Pistachio Butter" },
      {
        property: "og:description",
        content: "5 ingredients. Zero compromise. Indulge by the spoonful.",
      },
      { property: "og:type", content: "product" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Stesh Pistachio Butter",
          description: "Premium pistachio butter made with 5 clean ingredients.",
          brand: { "@type": "Brand", name: "Stesh" },
          offers: {
            "@type": "Offer",
            price: "19.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "36" },
        }),
      },
    ],
  }),
  component: ProductPage,
});

const jarGallery = [shopUpdates3, shopUpdates8, shopImg011, shopImg021, shopNutritionFacts];

const pailGallery = [shopPailImg, shopUpdates8, shopImg011, shopImg021, shopNutritionFacts];

type GalleryImage = { src: string; contain: boolean };

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
  { icon: FlaskConical, label: "Prebiotic Fiber" },
  { icon: Heart, label: "Protein-Forward" },
  { icon: Wheat, label: "5 Ingredients" },
];

const useImages = [
  { img: useToastImg, title: "Spread", note: "Spread it on toast, bagels and croissants" },
  { img: useSmoothieImg, title: "Blend", note: "Blend into smoothies or protein shakes" },
  { img: usePancakesImg, title: "Drizzle", note: "Drizzle over pancakes, yogurt or oatmeal" },
  { img: useDipImg, title: "Dip", note: "Dip in your strawberries and apples" },
  { img: useBakeImg, title: "Bake", note: "Use in baking cookies and cakes" },
];

const faqs = [
  {
    q: "Is it vegan?",
    a: "Yes. Stesh is 100% plant-based: no dairy, no honey, no animal products.",
  },
  {
    q: "Does it contain seed oils?",
    a: "Never. We use avocado oil, full stop. No canola, sunflower, soybean, or palm.",
  },
  {
    q: "How much protein?",
    a: "Roughly 6g per serving, thanks to the almond protein powder we blend in.",
  },
  {
    q: "How long does an opened jar last?",
    a: "Stored in a cool spot, about 3 months once opened. You probably won't make it that long.",
  },
  {
    q: "Can I bake with it?",
    a: "Absolutely. It's gorgeous swirled into cookies, banana bread, brownies, and croissants.",
  },
  {
    q: "How is it different from other nut butters?",
    a: "Real pistachio flavor, added protein, and avocado oil instead of seed oils.",
  },
];

function ProductPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [variants, setVariants] = useState<ShopifyVariant[]>([]);
  // Chosen value per option name, e.g. { Flavor: "Original", Size: "8 Ounce" }.
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [discount, setDiscount] = useState<DiscountPricing>(null);
  const [purchaseType, setPurchaseType] = useState<"once" | "subscribe">("once");
  const [cadence, setCadence] = useState<2 | 4 | 8>(4);
  const pendingHandled = useRef(false);
  const { addToCart, cart, updateQuantity, applyDiscount, removeDiscount, loading } = useCart();
  const DISCOUNT_CODE = import.meta.env.VITE_SUBSCRIBE_DISCOUNT_CODE as string | undefined;

  useEffect(() => {
    getFirstProduct()
      .then((p) => {
        if (!p) return;
        setProduct(p);
        setVariants(p.variants);
        const first = p.variants[0];
        if (first) {
          setSelectedOptions(
            Object.fromEntries(first.selectedOptions.map((o) => [o.name, o.value])),
          );
          getDiscountPricing(first.id)
            .then(setDiscount)
            .catch(() => null);
        }
      })
      .catch((err) => console.error("Shopify product fetch failed:", err));
  }, []);

  // Activate pending subscription after the user signs in and is redirected back
  useEffect(() => {
    if (!user || pendingHandled.current) return;
    const raw = localStorage.getItem(PENDING_SUB_KEY);
    if (!raw) return;
    pendingHandled.current = true;
    const pending: PendingSub = JSON.parse(raw);
    getSupabaseClient()
      .from("subscriptions")
      .insert({
        user_id: user.id,
        product_name: "Stesh Pistachio Butter",
        variant_id: pending.variantId,
        variant_name: pending.variantName,
        cadence_weeks: pending.cadenceWeeks,
        price_cents: pending.priceCents,
        discount_percent: 15,
        status: "pending_payment",
      })
      .then(async ({ error }: { error: { message: string } | null }) => {
        localStorage.removeItem(PENDING_SUB_KEY);
        if (error) {
          toast.error("Couldn't set up your subscription. Please try again.");
        } else {
          toast.success("Subscription activated! You'll save 15% on every order.");
          const existingLine = cart?.lines.find((l) => l.merchandise.id === pending.variantId);
          if (existingLine) {
            await updateQuantity(existingLine.id, 1);
          } else {
            await addToCart(pending.variantId, 1);
          }
          if (DISCOUNT_CODE) await applyDiscount(DISCOUNT_CODE);
          setPurchaseType("subscribe");
          setCadence(pending.cadenceWeeks);
        }
      });
  }, [user, addToCart, cart, updateQuantity, applyDiscount, DISCOUNT_CODE]);

  // Option rows to render (Flavor, then Size), skipping any single-value option.
  const optionRows = (product?.options ?? [])
    .filter((o) => o.values.length > 1)
    .slice()
    .sort((a, b) => optionRank(a.name) - optionRank(b.name));

  const variantMatches = (v: ShopifyVariant, opts: Record<string, string>) =>
    v.selectedOptions.every((o) => opts[o.name] === o.value);

  const selectedVariant = variants.find((v) => variantMatches(v, selectedOptions)) ?? variants[0];

  // Pick a value for one option; carry the other options where a real variant
  // supports it, otherwise snap to the closest available variant for that value.
  function selectOption(name: string, value: string) {
    const withValue = variants.filter((v) =>
      v.selectedOptions.some((o) => o.name === name && o.value === value),
    );
    if (withValue.length === 0) return;
    const wanted = { ...selectedOptions, [name]: value };
    const chosen =
      withValue.find((v) => variantMatches(v, wanted)) ??
      withValue.find((v) => v.availableForSale) ??
      withValue[0];
    setSelectedOptions(Object.fromEntries(chosen.selectedOptions.map((o) => [o.name, o.value])));
  }

  const isPail =
    (selectedOptions["Size"]?.toLowerCase().match(/pail|gallon/) ?? false) ||
    (selectedVariant?.title?.toLowerCase().includes("pail") ?? false);
  const flavor = (
    selectedOptions["Flavor"] ??
    selectedVariant?.title?.split(" / ")[0] ??
    ""
  ).toLowerCase();

  // Extra photos uploaded to the product in Shopify admin but not assigned as
  // any single variant's image, looked up by filename so the site stays in
  // sync as Shopify's CDN URLs change.
  const remoteImages = product?.images ?? [];
  const findRemoteImage = (needle: string) =>
    remoteImages.find((img) => img.url.toLowerCase().includes(needle.toLowerCase()))?.url;

  // Each slide carries how it should sit in the frame: packshots and the
  // nutrition graphic are centered on white ("contain"); lifestyle photos fill
  // the frame edge to edge ("cover").
  let localGallery: GalleryImage[];
  if (flavor === "unsweetened") {
    // Packshot is already the live Shopify variant image (slide 0); just add
    // the hand shot and the Unsweetened nutrition panel.
    const hand = findRemoteImage("Unsweetened_hand_pic");
    const nutrition = findRemoteImage("Nutrition_facts");
    localGallery = [
      ...(hand ? [{ src: hand, contain: false }] : []),
      ...(nutrition ? [{ src: nutrition, contain: true }] : []),
    ];
  } else if (flavor === "variety") {
    // Both-jars packshot is already the live Shopify variant image (slide 0);
    // add both flavors' nutrition panels.
    const unsweetenedNutrition = findRemoteImage("Nutrition_facts");
    localGallery = [
      { src: shopNutritionFacts, contain: true },
      ...(unsweetenedNutrition ? [{ src: unsweetenedNutrition, contain: true }] : []),
    ];
  } else {
    localGallery = (isPail ? pailGallery : jarGallery).map((src) => ({
      src,
      contain: src === shopNutritionFacts,
    }));
  }
  // Lead with the Shopify variant image (the photo uploaded in admin), then the
  // curated lifestyle/nutrition shots.
  const currentGallery: GalleryImage[] = selectedVariant?.image?.url
    ? [{ src: selectedVariant.image.url, contain: true }, ...localGallery]
    : localGallery;
  const activeImage = currentGallery[active] ?? currentGallery[0];

  // Pre-order: inventory is 0 but Shopify still allows purchase.
  const isPreorder = Boolean(
    selectedVariant?.availableForSale && selectedVariant?.currentlyNotInStock,
  );

  useEffect(() => {
    setActive(0);
  }, [selectedVariant?.id]);

  // Subscribe & Save isn't offered on pre-order items, so keep it one-time.
  useEffect(() => {
    if (isPreorder) setPurchaseType("once");
  }, [isPreorder]);

  const basePrice = selectedVariant ? parseFloat(selectedVariant.price.amount) : 19.0;
  const subscribePrice = Math.round(basePrice * 0.85 * 100) / 100;
  const price =
    purchaseType === "subscribe" ? subscribePrice : discount ? discount.discountedPrice : basePrice;
  const isOnSale = purchaseType === "once" && discount !== null;

  async function handleAddToCart() {
    if (!selectedVariant) return;
    if (isPail && cart) {
      const origTotal = cart.lines.reduce(
        (s, l) => s + parseFloat(l.merchandise.price.amount) * l.quantity,
        0,
      );
      if (origTotal - parseFloat(cart.cost.totalAmount.amount) > 0.01) {
        await removeDiscount();
        toast.info("Pail added at full price. Subscription savings apply to jar orders only.");
      }
    }
    await addToCart(selectedVariant.id, qty);
  }

  async function handleSubscribeAndSave() {
    if (!selectedVariant) return;
    if (!user) {
      const pending: PendingSub = {
        variantId: selectedVariant.id,
        variantName: selectedVariant.title,
        cadenceWeeks: cadence,
        priceCents: Math.round(subscribePrice * 100),
      };
      localStorage.setItem(PENDING_SUB_KEY, JSON.stringify(pending));
      navigate({ to: "/auth", search: { redirect: "/product" } });
      return;
    }
    const { error } = await getSupabaseClient()
      .from("subscriptions")
      .insert({
        user_id: user.id,
        product_name: "Stesh Pistachio Butter",
        variant_id: selectedVariant.id,
        variant_name: selectedVariant.title,
        cadence_weeks: cadence,
        price_cents: Math.round(subscribePrice * 100),
        discount_percent: 15,
        status: "pending_payment",
      });
    if (error) {
      toast.error("Couldn't set up subscription. Please try again.");
      return;
    }
    const existingLine = cart?.lines.find((l) => l.merchandise.id === selectedVariant.id);
    if (existingLine) {
      await updateQuantity(existingLine.id, 1);
    } else {
      await addToCart(selectedVariant.id, 1);
    }
    if (DISCOUNT_CODE) await applyDiscount(DISCOUNT_CODE);
    toast.success(`Subscribed! You'll save 15% every ${cadence} weeks.`);
  }

  return (
    <PageShell>
      {/* GALLERY + PURCHASE */}
      <section className="overflow-x-hidden px-4 py-6 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-white aspect-4/3 md:aspect-4/5">
              <img
                src={activeImage.src}
                alt="Stesh Pistachio Butter"
                className={`absolute inset-0 h-full w-full transition-all duration-300 ${
                  activeImage.contain ? "object-contain p-6 md:p-10" : "object-cover"
                }`}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div
              className="mt-3 flex gap-1.5 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {currentGallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square h-11 w-11 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all md:h-16 md:w-16 lg:h-20 lg:w-20 ${
                    active === i
                      ? "border-pistachio-deep"
                      : "border-border/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt=""
                    className={`h-full w-full ${img.contain ? "object-contain p-1" : "object-cover"}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              8 oz · Pistachio
            </p>
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
              Stesh pistachio butter is a velvety smooth butter that brings the rich taste of
              pistachios into every spoonful. Say goodbye to cracking shells and say hello to the
              newest addition to your daily routine.
            </p>

            {/* Variant selector: one row per option, Flavor then Size */}
            {optionRows.map((option) => (
              <div key={option.name} className="mt-8">
                <p className="mb-3 text-[11px] uppercase tracking-widest-extra text-dark/60">
                  {option.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const existsAny = variants.some((v) =>
                      v.selectedOptions.some((o) => o.name === option.name && o.value === value),
                    );
                    const match = variants.find((v) =>
                      variantMatches(v, { ...selectedOptions, [option.name]: value }),
                    );
                    const soldOut = Boolean(match && !match.availableForSale);
                    // Exists as an option value, but not in combination with the
                    // other picked options (e.g. Unsweetened + 134 oz gallon).
                    const unavailableCombo = existsAny && !match;
                    const isSelected = selectedOptions[option.name] === value;
                    return (
                      <button
                        key={value}
                        onClick={() => selectOption(option.name, value)}
                        disabled={!existsAny || soldOut}
                        className={`rounded-full border px-5 py-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                          isSelected
                            ? "border-pistachio-deep bg-pistachio-light/20 text-pistachio-deep font-medium"
                            : "border-border hover:border-pistachio-deep"
                        } ${unavailableCombo ? "opacity-40" : ""}`}
                      >
                        {value}
                        {soldOut && " (Sold out)"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Purchase type: not offered on pre-order items */}
            {!isPreorder && (
              <div className="mt-8">
                <p className="mb-3 text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Purchase Type
                </p>
                <div className="flex rounded-full border border-border p-1">
                  <button
                    onClick={() => setPurchaseType("once")}
                    className={`flex-1 rounded-full py-2.5 text-[11px] uppercase tracking-widest-extra transition-all ${
                      purchaseType === "once"
                        ? "bg-pistachio-deep text-cream"
                        : "text-dark/60 hover:text-dark"
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => {
                      setPurchaseType("subscribe");
                      setQty(1);
                    }}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] uppercase tracking-widest-extra transition-all ${
                      purchaseType === "subscribe"
                        ? "bg-pistachio-deep text-cream"
                        : "text-dark/60 hover:text-dark"
                    }`}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Subscribe &amp; Save 15%
                  </button>
                </div>
                {purchaseType === "subscribe" && (
                  <div className="mt-4">
                    <p className="mb-2.5 text-[11px] uppercase tracking-widest-extra text-dark/60">
                      Deliver every
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {([2, 4, 8] as const).map((w) => (
                        <button
                          key={w}
                          onClick={() => setCadence(w)}
                          className={`rounded-full border px-5 py-2 text-sm transition-all ${
                            cadence === w
                              ? "border-pistachio-deep bg-pistachio-light/20 text-pistachio-deep font-medium"
                              : "border-border hover:border-pistachio-deep"
                          }`}
                        >
                          {w === 2 ? "Every 2 Weeks" : w === 4 ? "Every 4 Weeks" : "Every 8 Weeks"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3 md:mt-6">
              <div className="font-display text-3xl md:text-4xl">${price.toFixed(2)}</div>
              {purchaseType === "subscribe" && (
                <>
                  <div className="font-display text-xl text-muted-foreground line-through md:text-2xl">
                    ${basePrice.toFixed(2)}
                  </div>
                  <div className="border-b border-pistachio-deep pb-0.5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
                    15% off
                  </div>
                </>
              )}
              {isOnSale && (
                <>
                  <div className="font-display text-xl text-muted-foreground line-through md:text-2xl">
                    ${discount!.originalPrice.toFixed(2)}
                  </div>
                  <div className="border-b border-pistachio-deep pb-0.5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
                    {discount!.pctOff}% off
                  </div>
                </>
              )}
            </div>

            {/* Qty + CTA */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-6">
              {purchaseType === "once" && (
                <div className="flex w-fit items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              {purchaseType === "once" ? (
                <button
                  onClick={handleAddToCart}
                  disabled={loading || !selectedVariant}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-pistachio-deep px-5 py-4 text-[11px] uppercase tracking-wide text-cream transition-all hover:bg-dark disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1 sm:px-8 sm:tracking-widest-extra"
                >
                  {loading
                    ? "Adding…"
                    : isPreorder
                      ? `Pre-order Now · $${(price * qty).toFixed(2)}`
                      : `Add to Cart · $${(price * qty).toFixed(2)}`}
                  {!loading && (
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubscribeAndSave}
                  disabled={loading || !selectedVariant}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-pistachio-deep px-5 py-4 text-[11px] uppercase tracking-wide text-cream transition-all hover:bg-dark disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:tracking-widest-extra"
                >
                  {loading ? (
                    "Processing…"
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      Subscribe &amp; Save · ${price.toFixed(2)}/order
                    </>
                  )}
                  {!loading && (
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              )}
            </div>

            {isPreorder && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-pistachio-deep">
                <Truck className="h-3.5 w-3.5" />
                Pre-order · {PREORDER_SHIP_ESTIMATE}
              </p>
            )}

            <a
              href="https://www.amazon.com/dp/B0F9586XQ5"
              target="_blank"
              rel="noopener noreferrer"
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
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Secure checkout
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4" /> Free shipping over $60
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Ships in 2–3 days
              </span>
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
            Everything that's in it.{" "}
            <em className="not-italic text-pistachio-deep">Nothing that isn't.</em>
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
                  <img
                    src={u.img}
                    alt={u.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
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
            <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              FAQ
            </p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">Quick answers.</h2>
            <Link
              to="/faq"
              className="mt-6 inline-block border-b border-pistachio-deep pb-1 text-[11px] uppercase tracking-widest-extra text-pistachio-deep"
            >
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
                {openFaq === i && <p className="pb-6 text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
