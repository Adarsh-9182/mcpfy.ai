import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * OAuth and magic-link landing route: swaps the code for a session cookie.
 *
 * The redirect response is built first and the Supabase client writes its
 * cookies straight onto it. Setting them through `next/headers` instead and
 * then returning a fresh `NextResponse.redirect` drops the `Set-Cookie`
 * headers, which looks exactly like a failed sign-in: the exchange succeeds,
 * the browser never receives the session, and the next request bounces back
 * to the login screen.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Only ever redirect within this site.
  const requested = searchParams.get("next") ?? "/dashboard";
  const next = requested.startsWith("/") && !requested.startsWith("//")
    ? requested
    : "/dashboard";

  // Behind a proxy the forwarded host is the user-facing one.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const base =
    process.env.NODE_ENV === "development" || !forwardedHost
      ? origin
      : `https://${forwardedHost}`;

  const fail = (message: string) =>
    NextResponse.redirect(`${base}/cloud?error=${encodeURIComponent(message)}`);

  if (!code) return fail("missing_code");

  const response = NextResponse.redirect(`${base}${next}`);

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

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) return fail(error.message);
  if (!data.session) return fail("no_session");

  return response;
}
