import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Stesh" },
      { name: "description", content: "The terms and conditions governing your use of the Stesh website and purchase of our products." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Site Usage Rules",
    body: "We restrict activities that could harm the website, including unauthorized access attempts and automated data extraction without permission.",
  },
  {
    title: "2. Product Details",
    body: "We make every effort to accurately represent our products but do not guarantee error-free content. Stesh reserves the right to modify or discontinue items at any time.",
  },
  {
    title: "3. Payment Processing",
    body: "Transactions occur through third-party platforms including Amazon. Prices listed on the site are in USD and may change without advance notice.",
  },
  {
    title: "4. Shipping Responsibility",
    body: "The Pistashio Company handles fulfillment through external platforms and is not accountable for carrier-related delays after handoff.",
  },
  {
    title: "5. Content Protection",
    body: "All site materials belong to The Pistashio Company and are copyright-protected. Users may not reproduce content without written authorization.",
  },
  {
    title: "6. Account Security",
    body: "Users must protect account credentials and report suspicious activity immediately to connect@steshbutter.com.",
  },
  {
    title: "7. Liability Limits",
    body: "To the fullest extent permitted by law, damages are capped at amounts actually paid for products.",
  },
  {
    title: "8. Termination Rights",
    body: "Stesh may suspend access at any time for any reason, including violations of these terms.",
  },
  {
    title: "9. Governing Jurisdiction",
    body: "Delaware and New York law applies to these terms.",
  },
];

function TermsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title={<>Terms & <em className="not-italic text-pistachio-deep">Conditions</em></>}
        subtitle="Effective Date: May 19, 2025"
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-12 text-muted-foreground">
            These Terms & Conditions govern your use of the Stesh website and the purchase of our products. By using the site, you agree to the following terms.
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
              Questions about these terms? Email us at{" "}
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
