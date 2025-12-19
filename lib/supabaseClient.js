import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

// Fail fast with clear message
if (!supabaseUrl) {
  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL (check .env.local in project root)");
}
if (!/^https?:\/\//i.test(supabaseUrl)) {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL. It must be like https://xxxxx.supabase.co. Got: ${JSON.stringify(
      supabaseUrl
    )}`
  );
}
if (!supabaseAnonKey) {
  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
