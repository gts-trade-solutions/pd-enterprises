import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  console.log("Proxy hit:", pathname);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt|xml|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  try {
    const supabase = getSupabaseAdmin();

    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip_address =
      forwardedFor?.split(",")[0]?.trim() || realIp || null;

    const user_agent = req.headers.get("user-agent") || null;

    const { error } = await supabase.from("website_visits").insert([
      {
        path: pathname,
        user_agent,
        ip_address,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Visit inserted:", pathname);
    }
  } catch (error) {
    console.error("Proxy visit tracking error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};