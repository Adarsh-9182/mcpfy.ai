import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-layout";

export const metadata: Metadata = { title: "Trust Center" };

export default function TrustPage() {
  return (
    <LegalPage title="Trust Center" updated="August 2026">
      <section>
        <h2>Security practices</h2>
        <p>
          A production trust center would document encryption in transit and at
          rest, access controls, secret handling, and incident response.
        </p>
        <ul>
          <li>TLS everywhere, with certificates issued automatically.</li>
          <li>Scoped credentials and least-privilege access for tools.</li>
          <li>Audit logs for deploys and configuration changes.</li>
        </ul>
      </section>
      <section>
        <h2>Compliance</h2>
        <p>
          This demo makes no compliance claims. A real platform would list its
          certifications and reports here.
        </p>
      </section>
      <section>
        <h2>Reporting an issue</h2>
        <p>
          Security reports would go to a monitored disclosure address with a
          published response window.
        </p>
      </section>
    </LegalPage>
  );
}
