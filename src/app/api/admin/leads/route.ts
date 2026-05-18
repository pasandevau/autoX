import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data ?? [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, service, suburb, message, type } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({ name, phone, email: email ?? "", service: service ?? "", suburb: suburb ?? "", message: message ?? "", type: type ?? "manual", status: "new" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}
