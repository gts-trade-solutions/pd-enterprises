import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const today = new Date().toISOString().split("T")[0];

    const { data: allDays, error: totalError } = await supabase
      .from("daily_visits")
      .select("visit_count");

    const { data: todayRow, error: todayError } = await supabase
      .from("daily_visits")
      .select("visit_count")
      .eq("visit_date", today)
      .maybeSingle();

    if (totalError || todayError) {
      return NextResponse.json(
        {
          success: false,
          message: totalError?.message || todayError?.message || "Failed to load stats",
        },
        { status: 500 }
      );
    }

    const totalVisits = (allDays || []).reduce(
      (sum, row) => sum + (Number(row.visit_count) || 0),
      0
    );

    const todayVisits = Number(todayRow?.visit_count || 0);

    return NextResponse.json(
      {
        success: true,
        data: {
          totalVisits,
          todayVisits,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load stats" },
      { status: 500 }
    );
  }
}