import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * Clears the session. Like the callback, the response is built first so the
 * cookie removals ride out on it — writing them through `next/headers` and
 * returning a fresh redirect loses them, leaving the user still signed in.
 */
export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/cloud", request.url), {
    status: 303,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  await supabase.auth.signOut();

  return response;
}
