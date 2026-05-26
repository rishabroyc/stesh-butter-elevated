import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream text-dark">
      <Nav />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-tight md:text-6xl lg:text-8xl">{title}</h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
