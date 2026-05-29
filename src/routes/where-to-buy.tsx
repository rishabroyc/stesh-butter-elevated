import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ExternalLink, Search } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { StoreMap } from "@/components/site/StoreMap";

export const Route = createFileRoute("/where-to-buy")({
  head: () => ({
    meta: [
      { title: "Where to Buy — Stesh" },
      { name: "description", content: "Buy Stesh Pistachio Butter direct, on Amazon, or at a retailer near you." },
      { property: "og:title", content: "Where to Buy Stesh" },
      { property: "og:description", content: "Find Stesh online or in stores." },
    ],
  }),
  component: WhereToBuyPage,
});


const locations = [
  { name: "Rachel's Garden", neighborhood: "Greenpoint", address: "116 Nassau Ave", city: "New York", state: "NY", zip: "11222", lat: 40.7241, lng: -73.9494 },
  { name: "Mulberry Market", neighborhood: "Nolita", address: "251 Mulberry St", city: "New York", state: "NY", zip: "10012", lat: 40.7213, lng: -73.9966 },
  { name: "Health and Harmony", neighborhood: "Greenwich Village", address: "470 Hudson St", city: "New York", state: "NY", zip: "10014", lat: 40.7280, lng: -74.0046 },
  { name: "Eden Gourmet Marketplace", neighborhood: "Gramercy Park", address: "275 3rd Ave", city: "New York", state: "NY", zip: "10001", lat: 40.7406, lng: -73.9838 },
  { name: "Lincoln Market", neighborhood: "Greenpoint", address: "1133 Manhattan Ave", city: "New York", state: "NY", zip: "11222", lat: 40.7284, lng: -73.9513 },
  { name: "Sunac Natural Market", neighborhood: "Hell's Kitchen", address: "600 W 42nd St", city: "New York", state: "NY", zip: "10036", lat: 40.7588, lng: -74.0027 },
  { name: "Brooklyn Fare", neighborhood: "Hudson Yards", address: "431 W 37th Street", city: "New York", state: "NY", zip: "10018", lat: 40.7527, lng: -74.0023 },
  { name: "Brooklyn Fare", neighborhood: "Boerum Hill", address: "200 Schermerhorn Street", city: "New York", state: "NY", zip: "11201", lat: 40.6891, lng: -73.9898 },
  { name: "Brooklyn Fare", neighborhood: "Upper West Side", address: "75 West End Avenue", city: "New York", state: "NY", zip: "10023", lat: 40.7741, lng: -73.9897 },
  { name: "Foodtown", neighborhood: "Park Slope", address: "409 5th Ave", city: "New York", state: "NY", zip: "11215", lat: 40.6659, lng: -73.9793 },
  { name: "Foodtown", neighborhood: "Prospect Heights", address: "632 Vanderbilt Avenue", city: "New York", state: "NY", zip: "11238", lat: 40.6779, lng: -73.9680 },
  { name: "Foodtown", neighborhood: "Brooklyn Heights", address: "101 Clinton St", city: "New York", state: "NY", zip: "11201", lat: 40.6929, lng: -73.9983 },
  { name: "Natural Frontier Market", neighborhood: "Astoria", address: "31-28 Ditmars Blvd", city: "New York", state: "NY", zip: "11105", lat: 40.7741, lng: -73.9288 },
  { name: "Food Garden Market", neighborhood: "Crown Heights", address: "608 Franklin Avenue", city: "New York", state: "NY", zip: "11238", lat: 40.6693, lng: -73.9559 },
  { name: "Food Garden Market", neighborhood: "Boerum Hill", address: "102 4th Ave", city: "New York", state: "NY", zip: "11217", lat: 40.6852, lng: -73.9854 },
  { name: "A Matter Of Health", neighborhood: "Upper East Side", address: "1347 1st Avenue", city: "New York", state: "NY", zip: "10021", lat: 40.7673, lng: -73.9560 },
  { name: "Pop Up Grocer", neighborhood: "West Village", address: "205 Bleecker St", city: "New York", state: "NY", zip: "10012", lat: 40.7277, lng: -74.0027 },
  { name: "LifeThyme Natural Market", neighborhood: "West Village", address: "410 6th Ave", city: "New York", state: "NY", zip: "10011", lat: 40.7324, lng: -74.0005 },
  { name: "Healthy Way Organic Market", neighborhood: "Williamsburg", address: "265 Bedford Ave", city: "New York", state: "NY", zip: "11211", lat: 40.7139, lng: -73.9598 },
  { name: "Dumbo Market", neighborhood: "Cobble Hill", address: "205 Smith Street", city: "New York", state: "NY", zip: "11201", lat: 40.6882, lng: -73.9959 },
  { name: "Lincoln Market", neighborhood: "Chelsea", address: "501 6th Ave", city: "New York", state: "NY", zip: "10011", lat: 40.7452, lng: -74.0003 },
  { name: "Westside Market", neighborhood: "Gramercy Park", address: "180 3rd Avenue", city: "New York", state: "NY", zip: "10003", lat: 40.7390, lng: -73.9839 },
  { name: "Westside Market", neighborhood: "Chelsea", address: "170 West 23rd Street", city: "New York", state: "NY", zip: "10011", lat: 40.7445, lng: -73.9993 },
  { name: "Westside Market", neighborhood: "East Village", address: "84 3rd Avenue", city: "New York", state: "NY", zip: "10003", lat: 40.7297, lng: -73.9867 },
  { name: "Amish Market", neighborhood: "Hell's Kitchen", address: "731 9th Avenue", city: "New York", state: "NY", zip: "10019", lat: 40.7619, lng: -73.9917 },
  { name: "Elm Wellness", neighborhood: "West Village", address: "56 7th Avenue", city: "New York", state: "NY", zip: "10011", lat: 40.7334, lng: -74.0025 },
];

function WhereToBuyPage() {
  const [query, setQuery] = useState("");

  const filtered = locations.filter((l) => {
    const q = query.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.neighborhood.toLowerCase().includes(q) ||
      l.address.toLowerCase().includes(q) ||
      l.zip.includes(q)
    );
  });

  return (
    <PageShell>
      <PageHero
        eyebrow="Where to Buy"
        title={<>Find Stesh <em className="not-italic text-pistachio-deep">near you.</em></>}
        subtitle="Order direct, grab it on Amazon, or pick up a jar at one of our NYC partners."
      />

      {/* Online */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-8 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">Online</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              to="/product"
              className="group flex items-center justify-between rounded-2xl border border-border bg-off-white p-8 transition-all hover:-translate-y-1 hover:border-pistachio-deep hover:shadow-sm"
            >
              <div>
                <h3 className="font-display text-3xl">steshbutter.com</h3>
                <p className="mt-2 text-sm text-muted-foreground">Ships direct in 2–3 days. Free over $60.</p>
              </div>
              <ExternalLink className="h-5 w-5 shrink-0 text-pistachio-deep transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <a
              href="https://www.amazon.com/dp/B0F9586XQ5"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-off-white p-8 transition-all hover:-translate-y-1 hover:border-pistachio-deep hover:shadow-sm"
            >
              <div>
                <h3 className="font-display text-3xl">Amazon</h3>
                <p className="mt-2 text-sm text-muted-foreground">Prime eligible</p>
              </div>
              <ExternalLink className="h-5 w-5 shrink-0 text-pistachio-deep transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-6 text-[11px] uppercase tracking-widest-extra text-pistachio-deep">In stores · New York City</h2>
          <div className="h-75 overflow-hidden rounded-2xl border border-border md:h-140">
            <StoreMap locations={locations} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Click any pin to see the store name and address.</p>
        </div>
      </section>

      {/* Store list */}
      <section className="bg-off-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl">All stockists</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filtered.length} of {locations.length} locations
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or neighborhood…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-cream py-3 pl-11 pr-5 text-sm outline-none focus:border-pistachio-deep"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((l) => {
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.name} ${l.address} ${l.city} ${l.state} ${l.zip}`)}`;
              return (
                <div key={`${l.name}-${l.address}`} className="flex items-start gap-4 rounded-xl bg-cream p-6">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pistachio-light/40 text-pistachio-deep">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl leading-tight">{l.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-pistachio-deep/80">{l.neighborhood}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{l.address}, {l.city}, {l.state} {l.zip}</p>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 shrink-0 text-[10px] uppercase tracking-widest-extra text-pistachio-deep hover:underline"
                  >
                    Directions →
                  </a>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">No stores match "{query}"</p>
          )}

          <div className="mt-16 rounded-2xl border border-pistachio-deep/20 bg-pistachio-light/20 p-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl">Want Stesh in your store?</h3>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              We work with cafes, grocers, and gift shops. Get in touch.
            </p>
            <a
              href="/wholesale"
              className="mt-7 inline-block rounded-full bg-pistachio-deep px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream hover:bg-dark"
            >
              Wholesale inquiries →
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
