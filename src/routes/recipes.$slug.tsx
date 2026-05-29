import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Users } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import useToast from "@/assets/use-toast.jpg";
import useSmoothie from "@/assets/use-smoothie.jpg";
import usePancakes from "@/assets/use-pancakes.jpg";
import useDip from "@/assets/use-dip.jpg";
import useBake from "@/assets/use-bake.jpg";
import heroJar from "@/assets/hero-jar.jpg";

type Ingredient = { type: "item"; text: string } | { type: "header"; text: string } | { type: "spacer" };

type Recipe = {
  slug: string;
  title: string;
  tag: string;
  time: string;
  servings: string;
  img: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
};

function item(text: string): Ingredient { return { type: "item", text }; }
function header(text: string): Ingredient { return { type: "header", text }; }
const spacer: Ingredient = { type: "spacer" };

const RECIPES: Recipe[] = [
  {
    slug: "stesh-toast-five-ways",
    title: "Stesh Toast, Five Ways",
    tag: "Breakfast",
    time: "5 min",
    servings: "1 per variation",
    img: useToast,
    description: "Toast is the canvas. Stesh is the star. Here are five ways to take your morning toast from forgettable to something worth getting out of bed for.",
    ingredients: [
      item("Stesh Pistachio Butter (2 tbsp per slice)"),
      item("Your bread of choice — sourdough, multigrain, or rye"),
      spacer,
      header("Way 1 · The Classic"),
      item("Drizzle of honey"),
      item("Flaky sea salt"),
      spacer,
      header("Way 2 · Berry Bliss"),
      item("Fresh raspberries or sliced strawberries"),
      item("1 tsp chia seeds"),
      spacer,
      header("Way 3 · Banana Crunch"),
      item("½ banana, sliced"),
      item("Sprinkle of cinnamon"),
      item("Small handful of granola"),
      spacer,
      header("Way 4 · Sweet & Salty"),
      item("1 tbsp dark chocolate chips"),
      item("Maldon flaky sea salt"),
      spacer,
      header("Way 5 · The Power Toast"),
      item("Sliced strawberries"),
      item("1 tsp hemp seeds"),
      item("Drizzle of honey"),
    ],
    steps: [
      "Toast your bread to your preferred doneness — a little char on sourdough never hurts.",
      "While still warm, spread 2 generous tablespoons of Stesh across the surface. It'll melt slightly and that's exactly what you want.",
      "The Classic: drizzle honey over the Stesh, finish with a generous pinch of flaky salt.",
      "Berry Bliss: press raspberries or strawberries gently into the Stesh, sprinkle with chia seeds.",
      "Banana Crunch: lay banana slices across the toast, dust with cinnamon, scatter a handful of granola.",
      "Sweet & Salty: scatter dark chocolate chips while the toast is still warm so they soften, finish with Maldon salt.",
      "The Power Toast: top with sliced strawberries, hemp seeds, and a drizzle of honey.",
      "Eat immediately. This is not a meal prep situation.",
    ],
  },
  {
    slug: "green-stesh-smoothie",
    title: "The Green Stesh Smoothie",
    tag: "Smoothies",
    time: "3 min",
    servings: "1",
    img: useSmoothie,
    description: "Creamy, nutty, and bright green — this smoothie packs 6g of protein from Stesh alone. It tastes like a treat and acts like a meal.",
    ingredients: [
      item("2 tbsp Stesh Pistachio Butter"),
      item("1 cup fresh baby spinach"),
      item("1 frozen banana"),
      item("1 cup unsweetened almond milk"),
      item("1 tsp honey (optional)"),
      item("4–5 ice cubes"),
      spacer,
      header("Optional add-ins"),
      item("1 scoop vanilla protein powder"),
      item("1 tbsp chia seeds"),
    ],
    steps: [
      "Add the almond milk to your blender first — this helps everything blend smoothly without air pockets.",
      "Add the spinach, frozen banana, Stesh Pistachio Butter, and ice.",
      "If using protein powder or chia seeds, add them now.",
      "Blend on high for 60–90 seconds until completely smooth and creamy.",
      "Taste. Adjust sweetness with more honey if needed.",
      "Pour into a glass and drink immediately for the best texture.",
    ],
  },
  {
    slug: "pistachio-banana-pancakes",
    title: "Pistachio Banana Pancakes",
    tag: "Breakfast",
    time: "20 min",
    servings: "2 (about 8 pancakes)",
    img: usePancakes,
    description: "Fluffy weekend pancakes with a pistachio twist. The mashed banana adds natural sweetness, and a spoonful of Stesh on top makes these something special.",
    ingredients: [
      item("1 cup all-purpose flour"),
      item("1 tbsp baking powder"),
      item("Pinch of fine salt"),
      item("1 cup whole milk"),
      item("1 large egg"),
      item("1 ripe banana, mashed"),
      item("3 tbsp Stesh Pistachio Butter (plus more for serving)"),
      item("1 tbsp maple syrup (plus more for serving)"),
      item("Butter or coconut oil for the pan"),
    ],
    steps: [
      "In a large bowl, whisk together flour, baking powder, and salt.",
      "In a separate bowl, whisk together milk, egg, mashed banana, Stesh, and maple syrup until well combined.",
      "Pour the wet ingredients into the dry and fold until just combined. A few lumps are totally fine — don't overmix or the pancakes will be tough.",
      "Heat a nonstick skillet or griddle over medium heat. Add a small knob of butter and let it melt.",
      "Pour ¼ cup of batter per pancake. Cook until bubbles form across the surface and the edges look set, about 2–3 minutes.",
      "Flip and cook for another 1–2 minutes until the underside is golden.",
      "Serve stacked with a generous spoonful of Stesh on top and a drizzle of maple syrup.",
    ],
  },
  {
    slug: "pistachio-swirl-cookies",
    title: "Pistachio Swirl Cookies",
    tag: "Baking",
    time: "35 min",
    servings: "About 18 cookies",
    img: useBake,
    description: "Soft-centered, crispy-edged cookies with Stesh baked right in. The pistachio flavor is subtle but unmistakably there — and the flaky salt on top takes them over the edge.",
    ingredients: [
      item("1¾ cups all-purpose flour"),
      item("½ tsp baking soda"),
      item("½ tsp fine salt"),
      item("½ cup (1 stick) unsalted butter, softened"),
      item("½ cup Stesh Pistachio Butter"),
      item("¾ cup granulated sugar"),
      item("¼ cup packed brown sugar"),
      item("1 large egg"),
      item("1 tsp vanilla extract"),
      item("Flaky sea salt for topping"),
    ],
    steps: [
      "Preheat oven to 350°F (175°C). Line two baking sheets with parchment paper.",
      "In a medium bowl, whisk together flour, baking soda, and fine salt. Set aside.",
      "In a large bowl, beat the softened butter, Stesh, granulated sugar, and brown sugar together until light and fluffy, about 3 minutes.",
      "Add the egg and vanilla extract. Beat until combined, scraping down the sides of the bowl as needed.",
      "Fold in the flour mixture until just combined — the dough will be soft.",
      "Scoop heaping tablespoons of dough onto prepared baking sheets, spacing about 2 inches apart.",
      "Gently press each ball slightly flat. Sprinkle generously with flaky sea salt.",
      "Bake for 11–13 minutes, until the edges are lightly golden but the centers still look underdone.",
      "Remove from oven and let cool on the pan for 5 minutes before transferring. They firm up as they cool — resist the urge to overbake.",
    ],
  },
  {
    slug: "strawberry-stesh-dipping-board",
    title: "Strawberry Stesh Dipping Board",
    tag: "Snacks",
    time: "10 min",
    servings: "2–4",
    img: useDip,
    description: "The easiest thing to bring to any gathering. A big bowl of Stesh, fresh strawberries, and a drizzle of chocolate. It looks like you tried hard. You didn't.",
    ingredients: [
      item("½ cup Stesh Pistachio Butter"),
      item("1 lb fresh strawberries, hulled and halved"),
      item("2 oz dark chocolate, melted"),
      item("¼ cup granola"),
      item("2 tbsp coconut flakes, toasted"),
      item("1 tbsp honey"),
      spacer,
      header("Optional additions"),
      item("Sliced bananas"),
      item("Fresh raspberries"),
      item("Apple slices"),
    ],
    steps: [
      "If your Stesh is firm from the fridge, microwave it for 15–20 seconds and stir until smooth. Transfer to a small bowl or ramekin.",
      "Place the bowl of Stesh in the center of a large wooden board or serving platter.",
      "Arrange the strawberries around the bowl in clusters.",
      "Drizzle the melted dark chocolate over the strawberries and Stesh in a loose zigzag.",
      "Scatter granola and toasted coconut flakes across the board.",
      "Finish with a drizzle of honey over everything.",
      "Add any additional fruit around the edges to fill the board.",
      "Serve immediately with small spoons for scooping Stesh.",
    ],
  },
  {
    slug: "pistachio-overnight-oats",
    title: "Pistachio Overnight Oats",
    tag: "Breakfast",
    time: "5 min + overnight",
    servings: "1",
    img: heroJar,
    description: "Wake up to breakfast that's already made. The Stesh swirl keeps its richness overnight and turns a simple jar of oats into something you'll actually look forward to.",
    ingredients: [
      item("½ cup old-fashioned rolled oats"),
      item("¾ cup unsweetened almond milk"),
      item("2 tbsp Stesh Pistachio Butter (plus more for topping)"),
      item("1 tbsp chia seeds"),
      item("1 tbsp honey or maple syrup"),
      item("½ tsp vanilla extract"),
      item("Pinch of fine salt"),
      spacer,
      header("Toppings"),
      item("½ banana, sliced"),
      item("1 tbsp crushed pistachios"),
      item("Extra drizzle of Stesh"),
    ],
    steps: [
      "Add rolled oats, almond milk, chia seeds, honey, vanilla extract, and salt to a mason jar or airtight container.",
      "Stir everything together until well combined.",
      "Drop in a generous spoonful of Stesh and give it one gentle swirl — you want ribbons of pistachio butter running through, not a fully mixed jar.",
      "Seal and refrigerate overnight, or for at least 4 hours.",
      "In the morning, give it a stir. Add a splash more almond milk if you prefer a thinner consistency.",
      "Top with sliced banana, crushed pistachios, and an extra drizzle of Stesh.",
      "Eat cold, straight from the jar.",
    ],
  },
];

export const Route = createFileRoute("/recipes/$slug")({
  head: ({ params }) => {
    const recipe = RECIPES.find((r) => r.slug === params.slug);
    if (!recipe) return { meta: [{ title: "Recipe Not Found — Stesh" }] };
    return {
      meta: [
        { title: `${recipe.title} — Stesh Recipes` },
        { name: "description", content: recipe.description },
        { property: "og:title", content: recipe.title },
        { property: "og:description", content: recipe.description },
      ],
    };
  },
  component: RecipeDetailPage,
});

function RecipeDetailPage() {
  const { slug } = Route.useParams();
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return (
      <PageShell>
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display text-4xl">Recipe not found.</h1>
            <Link to="/recipes" className="mt-6 inline-block border-b border-pistachio-deep pb-0.5 text-pistachio-deep">
              ← Back to recipes
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Hero image */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[65vh]">
        <img
          src={recipe.img}
          alt={recipe.title}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 md:pb-14">
          <div className="mx-auto max-w-[1000px]">
            <Link
              to="/recipes"
              className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest-extra text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="h-3 w-3" /> All Recipes
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest-extra text-cream/70">
              <span>{recipe.tag}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{recipe.time}</span>
              <span className="flex items-center gap-1.5"><Users className="h-3 w-3" />{recipe.servings}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl leading-tight text-cream md:text-6xl">{recipe.title}</h1>
          </div>
        </div>
      </div>

      {/* Recipe body */}
      <section className="px-6 py-14 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{recipe.description}</p>

          <div className="mt-14 grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
            {/* Ingredients */}
            <div>
              <h2 className="mb-6 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Ingredients</h2>
              <ul className="space-y-2.5">
                {recipe.ingredients.map((ing, i) => {
                  if (ing.type === "spacer") return <li key={i} className="h-2" />;
                  if (ing.type === "header") return (
                    <li key={i} className="pt-2 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
                      {ing.text}
                    </li>
                  );
                  return (
                    <li key={i} className="flex items-start gap-3 text-dark/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />
                      {ing.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="mb-6 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Instructions</h2>
              <ol className="space-y-8">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-display text-3xl leading-none text-pistachio-deep/20 md:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 leading-relaxed text-dark/80">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl bg-pistachio-deep px-8 py-12 text-center text-cream md:py-16">
            <h2 className="font-display text-4xl md:text-5xl">Need a jar?</h2>
            <p className="mt-3 text-cream/70">You're going to need Stesh for this one.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/product"
                className="rounded-full bg-cream px-10 py-4 text-[11px] uppercase tracking-widest-extra text-pistachio-deep transition-colors hover:bg-pistachio-light"
              >
                Shop Stesh →
              </Link>
              <Link
                to="/recipes"
                className="rounded-full border border-cream/40 px-10 py-4 text-[11px] uppercase tracking-widest-extra text-cream transition-colors hover:bg-cream/10"
              >
                More recipes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
