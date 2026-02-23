import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name || "").toString().trim();
    if (!name) {
      return NextResponse.json({ error: "Missing name" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("registrations")
      .insert({ name })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name")?.trim();

    let query = supabaseAdmin.from("registrations").select("*").order("created_at", { ascending: false });

    if (name) {
      query = query.eq("name", name);
    }

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}