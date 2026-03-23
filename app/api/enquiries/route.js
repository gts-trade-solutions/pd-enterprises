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

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
      },
      { status: 200 }
    );
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

    return NextResponse.json(
      { success: true, data: data || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("enquiry GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();

    const id = body?.id;
    const status = body?.status?.trim()?.toLowerCase();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "id and status are required" },
        { status: 400 }
      );
    }

    const allowedStatuses = ["new", "read", "delivered"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry status updated successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("enquiry PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}