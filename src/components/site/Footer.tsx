import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark px-6 py-20 text-cream md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-3xl">
              stesh<span className="text-pistachio-light">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-cream/60">
              THE better-for-you pistachio butter. Help us share our stash of Stesh.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://www.instagram.com/getstesh/" aria-label="Instagram" className="text-cream/70 hover:text-pistachio-light">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@getstesh" aria-label="TikTok" className="text-cream/70 hover:text-pistachio-light text-sm font-bold">
                TT
              </a>
              <a href="https://www.linkedin.com/company/stesh-pistachio-butter" aria-label="LinkedIn" className="text-cream/70 hover:text-pistachio-light text-sm font-bold">
                in
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-light">Shop</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><Link to="/product" className="hover:text-cream">Pistachio Butter</Link></li>
              <li><a href="https://www.amazon.com/dp/B0F9586XQ5" target="_blank" rel="noopener noreferrer" className="hover:text-cream">Buy on Amazon</a></li>
              <li><Link to="/where-to-buy" className="hover:text-cream">Find in Store</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-light">Company</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><Link to="/about" className="hover:text-cream">Our Story</Link></li>
              <li><Link to="/wholesale" className="hover:text-cream">Wholesale</Link></li>
              <li><Link to="/recipes" className="hover:text-cream">Recipes</Link></li>
              <li><Link to="/faq" className="hover:text-cream">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-widest-extra text-pistachio-light">Help</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><a href="mailto:connect@steshbutter.com" className="hover:text-cream">Contact</a></li>
              <li><Link to="/privacy" className="hover:text-cream">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-cream">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 md:flex-row md:items-center">
          <span>© 2026 Stesh. All rights reserved.</span>
          <span>Made with a hint of magic — and a lot of pistachios.</span>
        </div>
      </div>
    </footer>
  );
}
