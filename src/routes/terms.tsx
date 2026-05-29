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

function TermsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title={<>Terms & <em className="not-italic text-pistachio-deep">Conditions</em></>}
        subtitle="Effective Date: May 19, 2025"
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-200 space-y-10 text-dark/80 leading-relaxed">

          <p>
            These Terms govern use of https://steshbutter.com, operated by The Pistashio Company, Inc. Users agree to comply by accessing the site.
          </p>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">1. Permitted Use</h2>
            <p>The site may only be used lawfully. Prohibited activities include disabling functionality, unauthorized access, and automated data extraction.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">2. Product Information</h2>
            <p>"We do not guarantee that product descriptions or other content on the Site are error-free, complete, or current." Products are sold through third-party platforms only.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">3. Pricing</h2>
            <p>Prices are in USD and subject to change. "Payments for orders will be processed through Amazon, and we do not store any payment information."</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">4. Shipping</h2>
            <p>Third-party platforms handle fulfillment. The company isn't responsible for carrier-related delays after handoff.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">5. Intellectual Property</h2>
            <p>All site content is protected. Users cannot reproduce material without written consent.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">6. User Accounts</h2>
            <p>Users must keep account credentials confidential and report suspected unauthorized access.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">7. Privacy</h2>
            <p>Usage is governed by the separate Privacy Policy.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">8. Liability Limits</h2>
            <p>"Our liability [shall not] exceed the total amount paid by you for the product or service in question."</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">9. Indemnification</h2>
            <p>Users must protect the company from claims arising from policy violations.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">10. Termination</h2>
            <p>Access may be suspended without notice for any reason.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">11. Governing Law</h2>
            <p>Delaware and New York law applies.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">12. Modifications</h2>
            <p>Terms changes take effect upon posting.</p>
          </div>

          <div className="rounded-2xl bg-off-white p-8">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
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
