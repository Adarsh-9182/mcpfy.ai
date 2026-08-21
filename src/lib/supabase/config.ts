/**
 * Supabase project credentials.
 *
 * Both values are public by design. `NEXT_PUBLIC_*` is inlined into the client
 * bundle at build time, so every visitor's browser already receives them; there
 * is nothing here that a reader of the deployed site could not already extract.
 * The anon key grants no privileges on its own — row level security is the
 * actual boundary — and the service role key, which *is* secret, appears
 * nowhere in this repository.
 *
 * They are checked in as defaults so a deployment works without anyone having
 * to configure project settings by hand. The environment still wins wherever it
 * is set, so a fork or a staging project overrides these two variables and
 * nothing else changes.
 */
const DEFAULT_SUPABASE_URL = "https://hmyxbvrchckiqpdwkflv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhteXhidnJjaGNraXFwZHdrZmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNjc4OTcsImV4cCI6MjEwMjg0Mzg5N30.d0tKmZUiC_oJoiXuWikrVVxV-ubJv_CfCTV8nk4QOSo";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
