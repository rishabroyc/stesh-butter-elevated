import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Star, Sparkles, Leaf, Wheat, Heart, FlaskConical } from "lucide-react";
import { subscribeEmail } from "@/lib/newsletter";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Marquee } from "@/components/site/Marquee";
import { Turtle } from "@/components/site/Turtle";

import finalBanner from "@/assets/final-banner.jpg";
const HERO_IMG = finalBanner;
const PRODUCT_IMG = "https://steshbutter.com/wp-content/uploads/2025/05/21-3-600x600-1.png";
const FOUNDERS_IMG = "https://steshbutter.com/wp-content/uploads/2025/05/104-KJ_Utsab-scaled.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stesh — THE Better-For-You Pistachio Butter" },
      {
        name: "description",
        content:
          "Stesh is a premium pistachio butter made with 5 clean ingredients. Vegan, no seed oils, prebiotic, protein-forward. Indulge by the spoonful.",
      },
      { property: "og:title", content: "Stesh — THE Better-For-You Pistachio Butter" },
      { property: "og:description", content: "5 ingredients. Zero compromise. Indulge by the spoonful." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const badges = [
  { icon: Leaf, label: "Vegan" },
  { icon: Sparkles, label: "No Seed Oils" },
  { icon: FlaskConical, label: "Prebiotic" },
  { icon: Heart, label: "Protein-Forward" },
  { icon: Wheat, label: "5 Ingredients" },
];

const reviews = [
  {
    text: "Like spreading a melted version of that luxurious Dubai chocolate filling on toast — indulgent, but with solid macro benefits.",
    name: "John D.",
    location: "New York, NY",
  },
  {
    text: "I don't even put it on anything, I just eat it straight out of the jar.",
    name: "Monika",
    location: "Portland, OR",
  },
  {
    text: "Way better than the grocery store one I purchased. Rich, creamy, and you can actually taste the pistachios.",
    name: "Beth",
    location: "Austin, TX",
  },
];

const uses = [
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/yogurtnew.png", title: "Spread it", note: "Toast, bagels and croissants" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/smoothienew.png", title: "Blend it", note: "Smoothies or protein shakes" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/pancake-bgnew.png", title: "Drizzle it", note: "Pancakes, yogurt or oatmeal" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/applesnew.png", title: "Dip it", note: "Strawberries and apples" },
  { img: "https://steshbutter.com/wp-content/uploads/2025/05/strawberrynew.png", title: "Bake it", note: "Cookies and cakes" },
];

function Home() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNlStatus("loading");
    try {
      await subscribeEmail(nlEmail, "homepage");
      setNlStatus("success");
    } catch {
      setNlStatus("error");
    }
  }

  return (
    <div className="bg-cream text-dark">
      <Nav />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden grain">
        <img
          src={HERO_IMG}
          alt="Open jar of Stesh pistachio butter"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-12 z-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-6 text-[11px] uppercase tracking-widest-extra text-cream/90 animate-fade-up">
              Pistachio butter · No shells · No nonsense
            </p>
            <h1 className="font-display text-[14vw] leading-[0.9] text-cream md:text-[110px] animate-fade-up" style={{ animationDelay: "120ms" }}>
              The better-<br />
              <em className="not-italic text-pistachio-light">for-you</em><br />
              pistachio butter.
            </h1>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-10 z-10 px-6 md:px-12">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base text-cream/90 md:text-lg animate-fade-up" style={{ animationDelay: "240ms" }}>
              One that you can indulge in freely. Made with 5 simple all-natural ingredients — a lot of love, a ton of care, and a hint of magic.
            </p>
            <Link
              to="/product"
              className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep transition-all hover:bg-pistachio-light hover:px-10 animate-fade-up"
              style={{ animationDelay: "360ms" }}
            >
              Shop Stesh
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE TRUST STRIP */}
      <section className="border-y border-pistachio-deep/15 bg-off-white py-5">
        <Marquee items={["Vegan", "No Seed Oils", "5 Ingredients", "Prebiotic", "Protein-Forward", "Clean Label"]} />
        <div className="h-3" />
        <Marquee
          reverse
          items={["Spread it", "Blend it", "Drizzle it", "Dip it", "Bake it", "Spoon it"]}
        />
      </section>

      {/* PRODUCT HERO */}
      <section id="product" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-warm-tan/20 md:aspect-auto md:min-h-[500px]">
            <img
              src={PRODUCT_IMG}
              alt="Stesh pistachio butter jar"
              className="h-full w-full object-cover object-center transition-transform duration-[1.2s] hover:scale-105"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              Stesh Pistachio Butter · 10 oz
            </p>
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              One spoonful. <em className="not-italic text-pistachio-deep">All</em> the good stuff.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Experience rich pistachio flavor with zero guilt and clean, powerful ingredients. Designed for those who crave both wellness and indulgence in every bite, Stesh combines bold taste with a short, natural ingredient list.
            </p>

            <div className="mt-8 grid grid-cols-5 gap-3">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pistachio-light/50 text-pistachio-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-dark/70">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <span className="font-display text-4xl">From $18.99</span>
            </div>

            <div className="mt-6">
              <Link to="/product" className="group inline-flex items-center justify-center gap-3 rounded-full bg-pistachio-deep px-8 py-5 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark">
                Shop Now
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Free shipping over $40 · Ships in 2–3 days
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative overflow-hidden bg-off-white px-6 py-28 md:px-12 md:py-40">
        <Turtle className="pointer-events-none absolute -right-10 top-20 hidden h-44 w-auto opacity-90 animate-float md:block" />
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={FOUNDERS_IMG}
                alt="Arsh and Utsab, Stesh founders"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center md:col-span-6">
            <p className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              Meet Arsh & Utsab
            </p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
              We didn't set out to build a food brand. We set out to find a pistachio butter <em className="not-italic text-pistachio-deep">worth eating</em>.
            </h2>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              At Stesh, we believe you can indulge by the spoonful without compromising your health. That's why we set out to create a better-for-you pistachio butter that can be the BEST part of your everyday routine. Made with just 5 simple all-natural ingredients + a lot of love, a ton of care, and a hint of magic from our good friend, Mr. Turtle.
            </p>
            <a href="#" className="mt-10 inline-flex w-fit items-center gap-3 border-b border-pistachio-deep pb-1 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              Read our story
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* US VS THEM */}
      <section className="bg-pistachio-deep px-6 py-28 text-cream md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-light">
                Why Stesh
              </p>
              <h2 className="font-display text-5xl leading-[1] md:text-7xl">
                Stesh vs.<br />
                <em className="not-italic text-pistachio-light/80">the other guys.</em>
              </h2>
            </div>
            <p className="max-w-sm text-cream/70">
              We read every label in the nut-butter aisle. Then we wrote a better one.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-cream/15">
            <div className="grid grid-cols-3 border-b border-cream/15 bg-cream/5 px-6 py-5 text-[11px] uppercase tracking-widest-extra md:px-10">
              <span className="text-cream/60"> </span>
              <span className="text-pistachio-light">Stesh</span>
              <span className="text-cream/60">The Other Guys</span>
            </div>
            {[
              ["Ingredients", "5, all natural", "15+ with fillers"],
              ["Oils", "Avocado oil", "Seed oils"],
              ["Added protein", "Almond protein", "None"],
              ["Prebiotic", "Yes", "No"],
              ["Taste", "Rich, real pistachio", "Muted, oversweetened"],
            ].map(([label, stesh, them]) => (
              <div key={label} className="grid grid-cols-3 items-center border-b border-cream/10 px-6 py-6 text-base last:border-0 md:px-10 md:text-lg">
                <span className="font-medium text-cream/80">{label}</span>
                <span className="flex items-center gap-2 text-pistachio-light">
                  <Check className="h-4 w-4" /> {stesh}
                </span>
                <span className="flex items-center gap-2 text-cream/55">
                  <X className="h-4 w-4" /> {them}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 text-center">
            <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              10,000+ happy spoonful-ers
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
              Don't just take it <em className="not-italic text-pistachio-deep">from our spoon</em>.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="flex flex-col rounded-2xl bg-off-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(74,103,65,0.35)]"
              >
                <div className="mb-5 flex gap-1 text-pistachio-deep">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-display text-2xl leading-snug">"{r.text}"</p>
                <div className="mt-auto pt-8 text-[11px] uppercase tracking-widest-extra text-muted-foreground">
                  {r.name} · {r.location}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* USES */}
      <section id="uses" className="bg-off-white px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              Ways to <em className="not-italic text-pistachio-deep">enjoy it.</em>
            </h2>
            <p className="max-w-sm text-muted-foreground">
              Or, you know — eat it straight from the spoon. Mr. Turtle does.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {uses.map((u) => (
              <div key={u.title} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-cream">
                  <img
                    src={u.img}
                    alt={u.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-2xl">{u.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{u.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-pistachio-deep/15 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
            Newsletter
          </p>
          <h2 className="font-display text-5xl leading-[1] md:text-7xl">
            Go nuts for <em className="not-italic text-pistachio-deep">our newsletter.</em>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Recipes, drops, and the occasional Mr. Turtle update. No spam, ever.
          </p>
          {nlStatus === "success" ? (
            <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-pistachio-deep/20 bg-pistachio-light/20 px-8 py-6 text-center">
              <p className="font-display text-2xl text-pistachio-deep">You're in.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use <span className="font-semibold text-pistachio-deep">WELCOME10</span> at checkout for 10% off.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-pistachio-deep/30 bg-cream px-6 py-4 text-base outline-none placeholder:text-dark/40 focus:border-pistachio-deep"
              />
              <button
                disabled={nlStatus === "loading"}
                className="rounded-full bg-pistachio-deep px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream transition-colors hover:bg-dark disabled:opacity-60"
              >
                {nlStatus === "loading" ? "Subscribing…" : "Sign me up"}
              </button>
            </form>
          )}
          {nlStatus === "error" && (
            <p className="mt-3 text-center text-sm text-red-500">Something went wrong — please try again.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
