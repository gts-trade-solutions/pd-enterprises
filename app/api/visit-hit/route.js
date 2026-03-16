import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function incrementVisit() {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().split("T")[0];

  const { data: dailyRow, error: dailyFetchError } = await supabase
    .from("daily_visits")
    .select("visit_date, visit_count")
    .eq("visit_date", today)
    .maybeSingle();

  if (dailyFetchError) {
    throw new Error(`daily_visits fetch error: ${dailyFetchError.message}`);
  }

  if (dailyRow) {
    const { error: dailyUpdateError } = await supabase
      .from("daily_visits")
      .update({ visit_count: Number(dailyRow.visit_count || 0) + 1 })
      .eq("visit_date", today);

    if (dailyUpdateError) {
      throw new Error(`daily_visits update error: ${dailyUpdateError.message}`);
    }
  } else {
    const { error: dailyInsertError } = await supabase
      .from("daily_visits")
      .insert([{ visit_date: today, visit_count: 1 }]);

    if (dailyInsertError) {
      throw new Error(`daily_visits insert error: ${dailyInsertError.message}`);
    }
  }
}

export async function POST() {
  try {
    await incrementVisit();

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("visit-hit POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to increment visit count" },
      { status: 500 }
    );
  }
}