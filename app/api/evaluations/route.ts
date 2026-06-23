import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export async function GET(req: Request) {
    const supabase = await createSupabaseServerClient();

    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bidId = (searchParams.get("bidId") || "").trim();
    if (!bidId) return NextResponse.json({ error: "bidId is required" }, { status: 400 });

    const { data, error } = await supabase
        .from("evaluations")
        .select("*")
        .eq("bid_id", bidId)
        .eq("evaluator_id", authData.user.id)
        .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ evaluation: data ?? null });
}

export async function POST(req: Request) {
    const supabase = await createSupabaseServerClient();

    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: any;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const bidId = typeof body?.bidId === "string" ? body.bidId.trim() : "";
    if (!bidId) return NextResponse.json({ error: "bidId is required" }, { status: 400 });

    const scores = body?.scores;
    if (!scores || typeof scores !== "object") {
        return NextResponse.json({ error: "scores is required" }, { status: 400 });
    }

    const overallScore = body?.overallScore;
    if (typeof overallScore !== "number" || Number.isNaN(overallScore)) {
        return NextResponse.json({ error: "overallScore must be a number" }, { status: 400 });
    }

    const overallRemarks =
        typeof body?.overallRemarks === "string" ? body.overallRemarks.trim() : "";
    if (!overallRemarks) {
        return NextResponse.json({ error: "overallRemarks is required" }, { status: 400 });
    }

    const user = authData.user;

    // lock per evaluator per bid
    const { data: existing, error: existingErr } = await supabase
        .from("evaluations")
        .select("id")
        .eq("bid_id", bidId)
        .eq("evaluator_id", user.id)
        .maybeSingle();

    if (existingErr) return NextResponse.json({ error: existingErr.message }, { status: 500 });
    if (existing?.id) {
        return NextResponse.json(
            { error: "You already submitted an evaluation for this bid. Locked." },
            { status: 409 }
        );
    }

    const payload = {
        bid_id: bidId,
        evaluator_id: user.id,
        evaluator_name:
            (typeof body?.evaluatorName === "string" ? body.evaluatorName.trim() : "") ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "",
        evaluator_email:
            (typeof body?.evaluatorEmail === "string" ? body.evaluatorEmail.trim() : "") ||
            user.email ||
            "",
        scores,
        overall_score: overallScore,
        overall_remarks: overallRemarks,
        status: "Completed",
        submitted_at: body?.submittedAt || new Date().toISOString(),
    };

    const { data: inserted, error: insertErr } = await supabase
        .from("evaluations")
        .insert(payload)
        .select("*")
        .single();

    if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });
    return NextResponse.json({ ok: true, evaluation: inserted });
}
