import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const BUCKET = process.env.SUPABASE_BLOG_MEDIA_BUCKET || "blog-media";

function sanitizeName(name = "file") {
  return String(name)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
}

function getType(mime = "") {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "file";
}

export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const form = await req.formData();

    const prefixRaw = form.get("prefix") || `draft-${Date.now()}`;
    const prefix = sanitizeName(prefixRaw);

    const files = form.getAll("files");
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided (use FormData key: files)" }, { status: 400 });
    }

    const items = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const ab = await file.arrayBuffer();
      const buffer = Buffer.from(ab);

      const safe = sanitizeName(file.name || "upload");
      const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}-${safe}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (upErr) {
        return NextResponse.json({ error: upErr.message }, { status: 500 });
      }

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

      items.push({
        type: getType(file.type),
        url: pub?.publicUrl || "",
        path,
        name: file.name || safe,
        mime: file.type || "",
        size: file.size || 0,
      });
    }

    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();
    const paths = Array.isArray(body.paths) ? body.paths : [];

    if (!paths.length) {
      return NextResponse.json({ error: "paths[] is required" }, { status: 400 });
    }

    const { error } = await supabase.storage.from(BUCKET).remove(paths);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
