import {
  PageHeader,
  Panel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
} from "@/components/dashboard/ui";
import { team } from "@/lib/dashboard";

export const metadata = { title: "Team" };

const roles = [
  { role: "Owner", can: "Everything, including billing and deleting the organization." },
  { role: "Admin", can: "Manage servers, domains, secrets and members." },
  { role: "Developer", can: "Deploy, run tests and read logs and analytics." },
  { role: "Viewer", can: "Read-only access to analytics and deployments." },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Team"
        description="Who can see and change things in this organization."
        action={
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Invite member
          </button>
        }
      />

      <Panel title="Members">
        <Table>
          <Thead>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Added</Th>
            <Th />
          </Thead>
          <Tbody>
            {team.map((m) => (
              <tr key={m.email}>
                <Td className="font-medium">{m.name}</Td>
                <Td className="text-muted-foreground">{m.email}</Td>
                <Td>{m.role}</Td>
                <Td className="text-muted-foreground">{m.added}</Td>
                <Td className="text-right">
                  <button
                    type="button"
                    className="text-[13px] font-medium hover:underline"
                  >
                    Manage
                  </button>
                </Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </Panel>

      <Panel title="Roles & permissions">
        <dl className="divide-y divide-border/60">
          {roles.map((r) => (
            <div key={r.role} className="flex gap-4 px-5 py-3.5">
              <dt className="w-28 shrink-0 text-[14px] font-medium">{r.role}</dt>
              <dd className="text-[14px] text-muted-foreground">{r.can}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </>
  );
}
