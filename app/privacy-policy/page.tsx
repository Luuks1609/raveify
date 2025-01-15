import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <MaxWidthWrapper>
        <div className="leading-relaxed">
          <h1 className="mb-5 text-2xl font-bold">Raveify Privacy Policy</h1>
          <p className="mb-4">
            <strong>Effective Date:</strong> 15-01-2025
          </p>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Raveify (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) respects
              your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your information when you use our services, including
              our website and applications (collectively, the
              &quot;Service&quot;).
            </p>
            <p>
              By accessing or using the Service, you agree to the collection and
              use of your information as described in this Privacy Policy. If
              you do not agree with this policy, please do not use our Service.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <h3 className="text-lg font-medium">1.1 Information You Provide</h3>
            <p>
              We may collect information that you voluntarily provide when using
              the Service, including:
            </p>
            <ul className="list-inside list-disc">
              <li>Contact Information: Your name and email address.</li>
              <li>
                Spotify Data: Information related to your Spotify account, such
                as user ID, playlists, and preferences, which you authorize us
                to access.
              </li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-inside list-disc">
              <li>Provide, maintain, and improve the Service.</li>
              <li>Personalize your user experience.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Monitor and analyze usage trends to improve performance.</li>
              <li>
                Ensure compliance with our legal obligations and enforce our
                terms.
              </li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
            <p>
              We do not sell your personal information to third parties.
              However, we may share your information in the following
              circumstances:
            </p>
            <ul className="list-inside list-disc">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                vendors who assist in providing the Service (e.g., hosting or
                analytics).
              </li>
              <li>
                <strong>Legal Obligations:</strong> When required by law or to
                protect our legal rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p>
              We take reasonable precautions to protect your information from
              unauthorized access, disclosure, or misuse. However, no system is
              entirely secure, and we cannot guarantee absolute security.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Your Choices</h2>
            <p>You have the following rights regarding your data:</p>
            <ul className="list-inside list-disc">
              <li>
                <strong>Access and Correction:</strong> Request access to or
                correction of the personal information we hold about you.
              </li>
              <li>
                <strong>Data Deletion:</strong> Request the deletion of your
                personal information, subject to legal and contractual
                obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> Restrict certain data collection
                practices, such as analytics tracking.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at info@exodius.dev.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">6. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites or services.
              We are not responsible for the privacy practices of these external
              sites. Please review their privacy policies for more information.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">7. Children’s Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 13,
              and we do not knowingly collect personal information from
              children.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated effective date.
              Continued use of the Service after changes constitutes your
              acceptance of the updated policy.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p>
              Raveify Team
              <br />
              Email: info@exodius.dev
            </p>
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
