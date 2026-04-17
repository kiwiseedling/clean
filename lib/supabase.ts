import { createClient } from "@supabase/supabase-js";

// Public anon client — safe for client-side use, respects Row Level Security.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
