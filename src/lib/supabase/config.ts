/**
 * Supabase credentials come from the environment. They are read lazily so the
 * marketing site still builds and renders on a machine with no Supabase
 * project configured — only the auth routes need them.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
