import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const [
      totalVisitsRes,
      totalEnquiriesRes,
      newEnquiriesRes,
      recentVisitsRes,
      recentEnquiriesRes,
    ] = await Promise.all([
      supabase.from("website_visits").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase
        .from("enquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("website_visits")
        .select("*")
        .order("visited_at", { ascending: false })
        .limit(10),
      supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayVisitsRes = await supabase
      .from("website_visits")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", todayStart.toISOString());

    if (
      totalVisitsRes.error ||
      totalEnquiriesRes.error ||
      newEnquiriesRes.error ||
      recentVisitsRes.error ||
      recentEnquiriesRes.error ||
      todayVisitsRes.error
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            totalVisitsRes.error?.message ||
            totalEnquiriesRes.error?.message ||
            newEnquiriesRes.error?.message ||
            recentVisitsRes.error?.message ||
            recentEnquiriesRes.error?.message ||
            todayVisitsRes.error?.message ||
            "Failed to load dashboard",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalVisits: totalVisitsRes.count || 0,
          todayVisits: todayVisitsRes.count || 0,
          totalEnquiries: totalEnquiriesRes.count || 0,
          newEnquiries: newEnquiriesRes.count || 0,
        },
        recentVisits: recentVisitsRes.data || [],
        recentEnquiries: recentEnquiriesRes.data || [],
      },
    });
  } catch (error) {
    console.error("admin dashboard error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}