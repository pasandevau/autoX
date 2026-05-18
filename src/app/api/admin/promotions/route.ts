import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ promotions: data ?? [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, cta_text, cta_link, active, expires_at, badge } = body;

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

  const { data, error } = await supabase
    .from("promotions")
    .insert({ title, description: description ?? "", cta_text: cta_text ?? "", cta_link: cta_link ?? "", active: active ?? true, expires_at: expires_at ?? null, badge: badge ?? "" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ promotion: data });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });

  const { data, error } = await supabase
    .from("promotions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ promotion: data });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });

  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
