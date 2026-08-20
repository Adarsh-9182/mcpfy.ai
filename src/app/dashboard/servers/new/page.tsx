import { NewServerForm } from "@/components/dashboard/new-server-form";
import { requireSession } from "@/lib/session";

export default async function NewServerPage() {
  await requireSession();

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-xl font-medium tracking-tight">New server</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        Point mcpfy at a repository and it works out the runtime, builds it, and
        gives it a public MCP endpoint.
      </p>
      <NewServerForm />
    </div>
  );
}
