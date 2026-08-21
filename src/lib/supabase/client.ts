import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

/** Supabase client for use inside client components. */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
