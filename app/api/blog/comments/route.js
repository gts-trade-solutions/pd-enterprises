// app/api/blog/comments/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Table expected (minimum):
 * blog_comments: id, post_id, name, email, message, created_at
 * NOTE: message is NOT NULL in your DB.
 */

/**
 * GET /api/blog/comments?post_id=...
 * Returns all comments for that post (no status logic).
 */
export async function GET(req) {
  try {
    const supabase = getSupabaseAdmin();
    const url = new URL(req.url);
    const post_id = url.searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json({ error: "post_id is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_comments")
      .select("id,post_id,name,email,message,created_at")
      .eq("post_id", post_id)
      .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [] });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/blog/comments
 * Body: { post_id, name?, email?, message? OR comment? }
 * Supports both "message" and "comment" keys.
 */
export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const post_id = body?.post_id;
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();

    // ✅ IMPORTANT: your DB requires "message" NOT NULL
    const message = String(body?.message || body?.comment || "").trim();

    if (!post_id) {
      return NextResponse.json({ error: "post_id is required" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_comments")
      .insert({
        post_id,
        name: name || null,
        email: email || null,
        message, // ✅ map correctly
      })
      .select("id,post_id,name,email,message,created_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/blog/comments
 * Body: { id }
 */
export async function DELETE(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error } = await supabase.from("blog_comments").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
export async function PATCH(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const id = body?.id;
    const message = String(body?.message || '').trim();

    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    if (!message) return NextResponse.json({ error: "message is required" }, { status: 400 });

    const { data, error } = await supabase
      .from("blog_comments")
      .update({ message })
      .eq("id", id)
      .select("id,message,created_at,post_id,name,email")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
