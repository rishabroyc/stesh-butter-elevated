import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";

const links = [
  { label: "Shop", to: "/product" as const },
  { label: "Recipes", to: "/recipes" as const },
  { label: "Our Story", to: "/about" as const },
  { label: "Where to Buy", to: "/where-to-buy" as const },
  { label: "Wholesale", to: "/wholesale" as const },
  { label: "FAQ", to: "/faq" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <nav className="hidden flex-1 items-center gap-7 text-[11px] uppercase tracking-widest-extra text-dark md:flex">
          {links.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-pistachio-deep transition-colors"
              activeProps={{ className: "text-pistachio-deep" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="font-display text-2xl tracking-tight text-pistachio-deep md:flex-none">
          stesh<span className="text-warm-tan">.</span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-7 text-[11px] uppercase tracking-widest-extra text-dark md:flex">
          {links.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-pistachio-deep transition-colors"
              activeProps={{ className: "text-pistachio-deep" }}
            >
              {l.label}
            </Link>
          ))}
          <button className="relative flex items-center gap-2 text-dark hover:text-pistachio-deep transition-colors" aria-label="Cart">
            <ShoppingBag className="h-4 w-4" />
            <span>Cart (0)</span>
          </button>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden text-dark"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-dark text-cream md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" onClick={() => setOpen(false)} className="font-display text-2xl">
              stesh<span className="text-pistachio-light">.</span>
            </Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-6 pt-10 font-display text-4xl">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
