import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-layout";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 2026">
      <section>
        <h2>Using the service</h2>
        <p>
          These placeholder terms would describe acceptable use, account
          responsibilities, and the limits of the hosting platform.
        </p>
      </section>
      <section>
        <h2>Plans and billing</h2>
        <p>
          Paid plans renew on the billing period you select. Usage above your
          included credits is metered.
        </p>
      </section>
      <section>
        <h2>Availability</h2>
        <p>
          The service is provided as-is for demonstration purposes, without
          warranty of any kind.
        </p>
      </section>
    </LegalPage>
  );
}
