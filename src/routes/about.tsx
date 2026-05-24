import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Turtle } from "@/components/site/Turtle";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Stesh" },
      { name: "description", content: "Stesh was founded by Arsh and Utsab to make a pistachio butter actually worth eating. 5 ingredients. Zero compromise." },
      { property: "og:title", content: "Our Story — Stesh" },
      { property: "og:description", content: "Meet Arsh and Utsab — the founders behind Stesh." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
            Our Story
          </p>
          <h1 className="font-display text-5xl leading-[0.95] md:text-8xl">
            We made the pistachio butter <em className="not-italic text-pistachio-deep">we wanted to eat.</em>
          </h1>
        </div>
      </section>

      {/* Founder photo */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
          <img src="https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-53.png" alt="Arsh and Utsab" className="h-[60vh] w-full object-cover md:h-[80vh]" />
        </div>
      </section>

      {/* Origin */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://steshbutter.com/wp-content/uploads/2025/05/Rectangle-55.png"
              alt="Arsh and Utsab, Stesh founders"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              Arsh & Utsab · Founders
            </p>
            <div className="space-y-6 text-xl leading-relaxed text-dark/80 md:text-2xl">
              <p>
                At Stesh, we believe you can indulge by the spoonful without compromising your health. That's why we set out to create a better-for-you pistachio butter that can be the BEST part of your everyday routine.
              </p>
              <p>
                We're harnessing the power of pistachios — a nutrient rich nut — and keeping it simple. Made with just <em className="not-italic text-pistachio-deep">5 simple all-natural ingredients</em> + a lot of love, a ton of care, and a hint of magic from our good friend, Mr. Turtle.
              </p>
              <p>
                Pistachios, almond protein powder, avocado oil, organic cane sugar, sunflower lecithin. That's the whole list.
              </p>
              <p className="font-display text-3xl text-pistachio-deep md:text-4xl">
                "Made for you with love." — Arsh & Utsab
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-pistachio-deep px-6 py-24 text-cream md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Clean", d: "Five real ingredients. Nothing artificial. No seed oils. Ever." },
            { n: "02", t: "Indulgent", d: "Rich, creamy, eat-it-straight-from-the-spoon delicious." },
            { n: "03", t: "Honest", d: "We tell you what's in it. We tell you what's not. No labels-as-marketing." },
          ].map((c) => (
            <div key={c.n}>
              <span className="font-display text-5xl text-pistachio-light/60">{c.n}</span>
              <h3 className="mt-4 font-display text-3xl">{c.t}</h3>
              <p className="mt-3 text-cream/70">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mr Turtle */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2">
          <div className="relative">
            <div className="rounded-2xl bg-pistachio-light/30 p-12 md:p-20">
              <Turtle className="mx-auto h-64 w-auto animate-float" />
            </div>
          </div>
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
              Meet the team · Officially
            </p>
            <h2 className="font-display text-5xl leading-[1] md:text-6xl">
              And then there's <em className="not-italic text-pistachio-deep">Mr. Turtle.</em>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Mr. Turtle is our resident taste-tester, unofficial CMO, and the only member of the team who's truly never compromised on anything. He prefers his Stesh straight from the spoon. We trust his palate completely.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              You'll spot him around the brand. Say hi.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white px-6 py-24 text-center md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-5xl leading-[1] md:text-6xl">
            Help us share our <em className="not-italic text-pistachio-deep">stash of Stesh.</em>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/product" className="rounded-full bg-pistachio-deep px-10 py-5 text-[11px] uppercase tracking-widest-extra text-cream transition-colors hover:bg-dark">
              Shop Stesh →
            </Link>
            <a href="https://www.instagram.com/getstesh/" className="rounded-full border border-pistachio-deep px-10 py-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep hover:bg-pistachio-deep hover:text-cream">
              Follow @getstesh
            </a>
          </div>
        </div>
      </section>


    </PageShell>
  );
}
