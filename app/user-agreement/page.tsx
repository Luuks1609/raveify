import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="leading-relaxed">
          <h1 className="mb-5 text-2xl font-bold">
            Raveify End User Agreement
          </h1>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Raveify (&quot;the Application&quot;), a platform that
              allows users to create Spotify playlists based on music event
              lineups. By using Raveify, you agree to comply with and be bound
              by this End User Agreement (&quot;Agreement&quot;). If you do not
              agree to this Agreement, you must not use the Application.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">2. Eligibility</h2>
            <p>
              You must be at least 18 years old or the age of majority in your
              jurisdiction to use Raveify. By using the Application, you confirm
              that you meet this requirement.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Use of the Application</h2>
            <p>
              Raveify provides services for generating Spotify playlists based
              on event information. You agree to use the Application solely for
              lawful purposes and in compliance with all applicable laws and
              regulations. Raveify does not host or display Spotify content
              (e.g., cover art, audio content). Artist names displayed within
              the Application are sourced independently and do not originate
              from Spotify&apos;s API.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Spotify Integration</h2>
            <p>
              Raveify relies on the Spotify API to collect data in the backend.
              To use the Application&apos;s functionality, you must have a valid
              Spotify account and grant Raveify permission to access necessary
              Spotify API endpoints. Your use of Spotify&apos;s services is
              governed by Spotify&apos;s own terms and conditions. Raveify is
              not responsible for any actions taken on your Spotify account.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Privacy Policy</h2>
            <p>
              Raveify collects and processes limited user data necessary for its
              functionality. Please refer to the Raveify Privacy Policy for
              details on how your data is collected, used, and protected.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
            <p>
              All intellectual property rights related to Raveify, including but
              not limited to trademarks, logos, and software, remain the
              property of Raveify. You may not copy, modify, or distribute any
              part of the Application without prior written consent from
              Raveify.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">
              7. Limitation of Liability
            </h2>
            <p>
              Raveify is provided &quot;as is&quot; without warranties of any
              kind. We do not guarantee that the Application will be error-free,
              secure, or uninterrupted. To the fullest extent permitted by law,
              Raveify disclaims liability for any indirect, incidental, or
              consequential damages arising out of your use of the Application.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">8. Termination</h2>
            <p>
              Raveify reserves the right to terminate or suspend your access to
              the Application at any time, with or without notice, for any
              reason, including if you breach this Agreement.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">
              9. Changes to this Agreement
            </h2>
            <p>
              Raveify may update this Agreement from time to time. Any changes
              will be posted on our website, and continued use of the
              Application constitutes acceptance of the updated Agreement.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">10. Governing Law</h2>
            <p>
              This Agreement is governed by the laws of the Netherlands. Any
              disputes arising under this Agreement will be resolved exclusively
              in the courts of the Netherlands.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">11. Contact Information</h2>
            <p>
              For questions or concerns about this Agreement, please contact us
              at: info@exodius.dev By using Raveify, you acknowledge that you
              have read, understood, and agree to this End User Agreement.
            </p>
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
