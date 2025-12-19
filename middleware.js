import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req) {
  const auth = req.headers.get("authorization") || "";
  const [type, encoded] = auth.split(" ");

  if (type === "Basic" && encoded) {
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}
