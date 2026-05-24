import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import useToast from "@/assets/use-toast.jpg";
import useSmoothie from "@/assets/use-smoothie.jpg";
import usePancakes from "@/assets/use-pancakes.jpg";
import useDip from "@/assets/use-dip.jpg";
import useBake from "@/assets/use-bake.jpg";
import heroJar from "@/assets/hero-jar.jpg";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes — Stesh" },
      { name: "description", content: "Pistachio butter recipes: toast, smoothies, overnight oats, pancakes, energy bites, and more — all made with Stesh." },
      { property: "og:title", content: "Recipes — Stesh" },
      { property: "og:description", content: "Six things to make with Stesh this week." },
    ],
  }),
  component: RecipesPage,
});

const recipes = [
  { img: useToast, title: "Stesh Toast, Five Ways", tag: "Breakfast", time: "5 min", size: "lg" },
  { img: useSmoothie, title: "The Green Stesh Smoothie", tag: "Smoothies", time: "3 min", size: "sm" },
  { img: usePancakes, title: "Pistachio Banana Pancakes", tag: "Breakfast", time: "20 min", size: "sm" },
  { img: useBake, title: "Pistachio Swirl Cookies", tag: "Baking", time: "35 min", size: "lg" },
  { img: useDip, title: "Strawberry Stesh Dipping Board", tag: "Snacks", time: "10 min", size: "sm" },
  { img: heroJar, title: "Pistachio Overnight Oats", tag: "Breakfast", time: "5 min + overnight", size: "sm" },
];

function RecipesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Recipes · Stesh kitchen"
        title={<>Six things to make <em className="not-italic text-pistachio-deep">this week.</em></>}
        subtitle="Real recipes from the Stesh kitchen — and from the @getstesh community. Eat it straight from the spoon. Or, you know, try one of these."
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto grid max-w-[1400px] auto-rows-[260px] grid-cols-1 gap-6 md:auto-rows-[360px] md:grid-cols-3">
          {recipes.map((r, i) => (
            <Link
              key={r.title}
              to="/recipes"
              className={`group relative overflow-hidden rounded-2xl bg-warm-tan/15 ${
                r.size === "lg" ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={r.img}
                alt={r.title}
                className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest-extra text-cream/80">
                  <span>{r.tag}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl text-cream md:text-3xl">
                  {r.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
