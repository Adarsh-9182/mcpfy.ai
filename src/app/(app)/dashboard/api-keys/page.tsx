import {
  Mono,
  PageHeader,
  Panel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
} from "@/components/dashboard/ui";
import { apiKeys } from "@/lib/dashboard";

export const metadata = { title: "API keys" };

export default function ApiKeysPage() {
  return (
    <>
      <PageHeader
        title="API keys"
        description="Authenticate the CLI, CI and the mcpfy MCP server against this organization."
        action={
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Create key
          </button>
        }
      />

      <Panel title="Active keys">
        <Table>
          <Thead>
            <Th>Name</Th>
            <Th>Key</Th>
            <Th>Created</Th>
            <Th>Last used</Th>
            <Th />
          </Thead>
          <Tbody>
            {apiKeys.map((k) => (
              <tr key={k.prefix}>
                <Td className="font-medium">{k.name}</Td>
                <Td className="text-muted-foreground">
                  <Mono>{k.prefix}••••</Mono>
                </Td>
                <Td className="text-muted-foreground">{k.created}</Td>
                <Td className="text-muted-foreground">{k.lastUsed}</Td>
                <Td className="text-right">
                  <button
                    type="button"
                    className="text-[13px] font-medium text-red-600 hover:underline dark:text-red-400"
                  >
                    Revoke
                  </button>
                </Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </Panel>
    </>
  );
}
