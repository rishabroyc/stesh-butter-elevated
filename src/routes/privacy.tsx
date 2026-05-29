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

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em className="not-italic text-pistachio-deep">Policy</em></>}
        subtitle="Effective Date: May 19, 2025"
      />

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-200 space-y-10 text-dark/80 leading-relaxed">

          <p>
            At <strong>Stesh</strong>, accessible from https://steshbutter.com and owned by The Pistashio Company, Inc., we value the privacy of our customers. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our website, you agree to the terms outlined in this policy.
          </p>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">1. Information We Collect</h2>
            <p className="mb-4">We collect the following personal information when you place an order or interact with our website:</p>
            <ul className="mb-4 space-y-2 pl-4">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Name</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Email address</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Phone number</li>
            </ul>
            <p className="mb-4">We use this data to process your orders, communicate with you about your purchases, and improve our services.</p>
            <p>Additionally, we may collect anonymous information through cookies and other tracking technologies to enhance the functionality of the website and analyze user behavior.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">2. How We Use Your Information</h2>
            <p className="mb-4">The information we collect is used for the following purposes:</p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Processing Orders:</strong> To fulfill your orders, we need to process your name, email, and phone number.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Customer Support:</strong> To respond to your inquiries and assist with any issues you may have regarding your orders.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Marketing Communications:</strong> We may send you promotional emails regarding new products, special offers, and updates. You can opt-out of these communications at any time.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Website Improvement:</strong> We analyze usage data to enhance the performance and user experience of our website.</span></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">3. Sharing Your Information</h2>
            <p className="mb-4">We may share your personal information with trusted third-party service providers who assist us in performing tasks such as:</p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Payment Processing:</strong> Payments are securely handled through Amazon and we do not store your payment information.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Shipping And Delivery:</strong> We may share your shipping information with third-party logistics providers for the delivery of your order.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Marketing Services:</strong> We may share your data with email marketing providers or analytics platforms to improve our advertising and communications.</span></li>
            </ul>
            <p className="mt-4">We ensure that any third parties who process your data are compliant with privacy regulations and have appropriate data protection measures in place.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">4. Data Retention</h2>
            <p>We retain your personal data for up to 10 years to maintain business records and comply with legal and regulatory requirements. If you wish to request deletion of your personal data earlier, please contact us using the details below.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">5. Data Security</h2>
            <p>We employ standard security measures to protect your personal data. This includes encryption protocols for data in transit, secure storage methods, and restricted access to your data. However, no data transmission over the internet can be guaranteed to be 100% secure. We recommend using secure networks and devices to protect your information.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">6. Your Rights</h2>
            <p className="mb-4">You have the following rights concerning your personal information:</p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Access and Correction:</strong> You can request a copy of your personal data and ask us to update or correct any inaccuracies.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Deletion:</strong> You can request the deletion of your personal data, subject to certain legal exceptions.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" /><span><strong>Opt-out Of Marketing:</strong> You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.</span></li>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:connect@steshbutter.com" className="text-pistachio-deep hover:underline">connect@steshbutter.com</a>.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">7. Children's Privacy</h2>
            <p>We do not knowingly collect or process personal data from children under the age of 13. If you are a parent or guardian and believe we have inadvertently collected personal data from a child, please contact us so we can delete the information.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">8. International Data Transfers</h2>
            <p>Your personal data may be transferred and stored in countries outside of your country of residence, including Canada and the UAE. By using our services, you consent to these international transfers, which may be subject to different data protection laws.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will post the updated policy on this page and update the "Effective Date" above. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or would like to exercise your rights, please contact us at <a href="mailto:connect@steshbutter.com" className="text-pistachio-deep hover:underline">connect@steshbutter.com</a>.</p>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
