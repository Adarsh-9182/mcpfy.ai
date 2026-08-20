import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

/** Supabase client for server components, route handlers and actions. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — the middleware refreshes the
          // session cookies instead, so this is safe to ignore.
        }
      },
    },
  });
}
