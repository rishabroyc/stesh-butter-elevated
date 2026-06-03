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
            These Terms and Conditions (“Terms”) govern your use of the website located at https://steshbutter.com (“Site”), owned and operated by The Pistashio Company, Inc. (“Company”, “we”, “us”, “our”). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with these Terms, do not use the Site
          </p>

         <div>
            <h2 className="mb-4 font-display text-2xl text-dark">1. Use of the Website</h2>
            <p className="mb-4">You may use the Site for lawful purposes only. You agree to comply with all applicable laws and regulations while using the Site. You must not:</p>
            <ul className="mb-4 space-y-2 pl-4">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Use the Site in any way that could disable, overburden, or impair its functionality.</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Attempt to gain unauthorized access to any part of the Site or its systems.</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pistachio-deep/60" />Use any automated systems or software to extract data or content from the Site without permission.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">2. Product Information and Avaliability</h2>
            <p>We make every effort to accurately represent our products, including descriptions, images, and prices. However, we do not guarantee that product descriptions or other content on the Site are error-free, complete, or current. We reserve the right to modify or discontinue products without notice.</p>
            
            <p>All products listed on the Site are sold exclusively through third-party platforms and are not sold directly through the Site.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">3. Pricing and Payment</h2>
            <p>Prices listed on the Site are in USD (United States Dollar) and are subject to change without notice. Payments for orders will be processed through Amazon, and we do not store any payment information. By placing an order, you authorize Amazon to process payment for the total order amount, including any applicable taxes and shipping fees.

</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">4. Shipping and Delivery</h2>
            <p>We sell products through third-party platforms, and orders are fulfilled and shipped through those platforms. Shipping charges and estimated delivery times will be displayed during checkout. We are not responsible for any delays or issues related to shipping once the package has been handed to a carrier.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">5. Intellectual Property</h2>
            <p>All content on the Site, including but not limited to logos, text, images, graphics, and software, is the property of The Pistashio Company, Inc. or its licensors and is protected by copyright laws. You may not use, copy, reproduce, or distribute any content from the Site without prior written consent from us.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">6. User Accounts</h2>
            <p>To make a purchase or access certain features on the Site, you may need to create a user account. You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account. If you suspect any unauthorized use of your account, please notify us immediately.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">7. Privacy</h2>
            <p>Your use of the Site is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal data.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, The Pistashio Company, Inc. and its affiliates, officers, employees, agents, and partners will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to the use of the Site or the purchase
of products, even if we have been advised of the possibility of such damages.</p>
            <p>In no event shall our liability exceed the total amount paid by you for the product or service in question.

</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">9. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless The Pistashio Company, Inc. and its affiliates from any claims, losses, liabilities, or expenses (including attorney’s fees) arising from your violation of these Terms, your use of the Site, or your breach of any applicable law or regulation.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">10. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Site at any time, without notice, for any reason, including if you violate these Terms. Upon termination, all rights and licenses granted to you under these Terms will immediately cease, and you must stop using the Site.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">11. Governing Law</h2>
            <p>These Terms will be governed by and construed in accordance with the laws of the state of Delaware and New York, without regard to its conflict of laws principles.</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-dark">12. Changes to the Terms</h2>
            <p>The Pistashio Company, Inc. reserves the right to modify or update these Terms at any time. Any changes will be effective when posted on the Site, and the “Effective Date” at the top of these Terms will be updated accordingly. By continuing to use the Site after such changes, you agree to the modified Terms.</p>
          </div>

           <div>
            <h2 className="mb-4 font-display text-2xl text-dark">13. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at connect@steshbutter.com

</p>
          </div>

          

        </div>
      </section>
    </PageShell>
  );
}
