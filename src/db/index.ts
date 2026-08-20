import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "./schema";

/**
 * Local development runs against a file-backed libSQL database so the app works
 * with no external provisioning. Point DATABASE_URL at a hosted libSQL/Turso
 * instance (with DATABASE_AUTH_TOKEN) for anything shared.
 */
const client = createClient({
  url: process.env.DATABASE_URL ?? "file:./.data/mcpfy.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

export { schema };
