import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Stesh" },
      { name: "description", content: "How Stesh collects, uses, and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information Collected",
    body: "Stesh gathers name, email address, and phone number along with anonymous cookie data to enhance website functionality.",
  },
  {
    title: "2. Data Usage",
    body: "Personal information serves order processing, customer support, promotional communications (with opt-out options), and website analytics improvements.",
  },
  {
    title: "3. Third-Party Sharing",
    body: "We share data with service providers handling payments (via Amazon, no internal storage), shipping logistics, and marketing platforms — all bound by privacy compliance standards.",
  },
  {
    title: "4. Data Retention",
    body: "Customer data is maintained for approximately a decade to satisfy business record-keeping and legal obligations.",
  },
  {
    title: "5. Security Measures",
    body: "Stesh implements encryption and restricted access protocols, though acknowledges that internet transmission carries inherent risks.",
  },
  {
    title: "6. User Rights",
    body: "Customers may request data access, corrections, deletion, and marketing communication opt-outs by contacting connect@steshbutter.com.",
  },
  {
    title: "7. Child Protection",
    body: "We do not intentionally collect information from users under 13 years old.",
  },
  {
    title: "8. International Data Transfers",
    body: "Data may be transferred to Canada and the UAE, subject to varying legal frameworks.",
  },
];

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em className="not-italic text-pistachio-deep">Policy</em></>}
        subtitle="Effective Date: May 19, 2025"
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-12 text-muted-foreground">
            This Privacy Policy explains how Stesh (The Pistashio Company) collects, uses, and protects your personal information when you visit our website or make a purchase.
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="border-b border-border pb-10 last:border-0">
                <h2 className="mb-3 font-display text-2xl text-dark">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-off-white p-8">
            <p className="text-sm text-muted-foreground">
              Questions about this policy? Email us at{" "}
              <a href="mailto:connect@steshbutter.com" className="text-pistachio-deep hover:underline">
                connect@steshbutter.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
