import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  // Only callable with a valid admin cookie
  const token = req.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("id, name, email, quoted_price, payment_status, status, load, schedule, address")
    .eq("id", id)
    .single();

  if (error || !data) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  return Response.json(data);
}
