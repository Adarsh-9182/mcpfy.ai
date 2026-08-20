import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <section>
        <h2>What we collect</h2>
        <p>
          A demonstration site collects very little. In a production deployment
          this section would describe account data, usage telemetry, and any
          cookies set by analytics providers.
        </p>
        <ul>
          <li>Account details you provide when signing up.</li>
          <li>Usage metrics such as tool-call volume and latency.</li>
          <li>Cookie preferences stored locally in your browser.</li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          To operate the service, diagnose failures, and improve reliability. We
          would not sell personal data to third parties.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can decline non-essential cookies from the banner, and request
          deletion of your data at any time.
        </p>
      </section>
    </LegalPage>
  );
}
