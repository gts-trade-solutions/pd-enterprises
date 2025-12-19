// app/api/admin/blog/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIELDS =
  "id,title,slug,category,excerpt,content,rating,created_at,post_date,media,linkedin_url";

const makeSlug = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function GET(req) {
  try {
    const supabase = getSupabaseAdmin();
    const url = new URL(req.url);

    const slug = url.searchParams.get("slug"); // optional
    const id = url.searchParams.get("id"); // optional

    let q = supabase.from("blog_posts").select(FIELDS);

    if (slug) q = q.eq("slug", slug);
    if (id) q = q.eq("id", id);

    // single fetch
    if (slug || id) {
      const { data, error } = await q.maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ data });
    }

    // list fetch (ALL)
    const { data, error } = await q
      .order("post_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    let slug = makeSlug(body.slug || body.title) || `post-${Date.now()}`;

    const payload = {
      title: body.title,
      slug,
      category: body.category ?? null,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      rating: Number(body.rating) || 0,
      post_date: body.post_date ?? null,
      media: Array.isArray(body.media) ? body.media : [],
      linkedin_url: body.linkedin_url ? String(body.linkedin_url).trim() : null,
    };

    let { data, error } = await supabase
      .from("blog_posts")
      .insert(payload)
      .select()
      .single();

    // unique slug retry
    if (error && String(error.code) === "23505") {
      slug = `${slug}-${Date.now().toString(36)}`;
      const retry = await supabase
        .from("blog_posts")
        .insert({ ...payload, slug })
        .select()
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updates = {
      title: body.title,
      category: body.category ?? null,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      rating: Number(body.rating) || 0,
      post_date: body.post_date ?? null,
      media: Array.isArray(body.media) ? body.media : [],
      linkedin_url: body.linkedin_url ? String(body.linkedin_url).trim() : null,
      ...(body.slug ? { slug: makeSlug(body.slug) } : {}),
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", body.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", body.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
