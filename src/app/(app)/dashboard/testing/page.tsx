import { PageHeader } from "@/components/dashboard/ui";
import { TestSuites } from "@/components/dashboard/sections";

export const metadata = { title: "Testing" };

export default function TestingPage() {
  return (
    <>
      <PageHeader
        title="Testing"
        description="Cross-client suites that gate the merge. A regression in any client blocks the deploy."
      />
      <TestSuites />
    </>
  );
}
