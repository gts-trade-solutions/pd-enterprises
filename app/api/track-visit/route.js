import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();

    const path = body?.path || "/";
    const referrer = body?.referrer || null;
    const visitor_id = body?.visitor_id || null;

    const user_agent = req.headers.get("user-agent") || null;
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip_address =
      forwardedFor?.split(",")[0]?.trim() || realIp || null;

    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("website_visits").insert([
      {
        path,
        referrer,
        user_agent,
        ip_address,
        visitor_id,
      },
    ]);

    if (error) {
      console.error("track visit insert error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("track visit route error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to track visit" },
      { status: 500 }
    );
  }
}