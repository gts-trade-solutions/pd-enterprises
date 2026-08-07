import { createClient } from "@supabase/supabase-js";

let client = null;

// Built on first use, not at import time. Prerendering this module during
// `next build` must not throw just because the env vars are absent — that
// turns a misconfigured environment into a failed build instead of a
// readable runtime error.
function getClient() {
  if (client) return client;

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  if (!supabaseUrl) {
    throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
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

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = getClient()[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);
