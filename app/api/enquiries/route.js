import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const phone = body?.phone?.trim() || null;
    const subject = body?.subject?.trim() || null;
    const message = body?.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("enquiries").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
        status: "new",
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("enquiry POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("enquiry GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}