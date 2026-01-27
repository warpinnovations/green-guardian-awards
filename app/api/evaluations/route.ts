import { NextResponse } from "next/server";

declare global {
    // eslint-disable-next-line no-var
    var __EVAL_STORE__: Map<string, any> | undefined;
}

const store = global.__EVAL_STORE__ ?? new Map<string, any>();
global.__EVAL_STORE__ = store;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const bidId = (searchParams.get("bidId") || "").trim();

    if (!bidId) {
        return NextResponse.json({ error: "bidId is required" }, { status: 400 });
    }

    const evaluation = store.get(bidId) || null;
    return NextResponse.json({ evaluation });
}

export async function POST(req: Request) {
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

    if (store.has(bidId)) {
        return NextResponse.json(
            { error: "Evaluation already submitted. Locked." },
            { status: 409 }
        );
    }

    const payload = {
        bidId,
        scores,
        overallScore,
        overallRemarks,
        status: "Completed",
        submittedAt: body?.submittedAt || new Date().toISOString(),
    };

    store.set(bidId, payload);
    return NextResponse.json({ ok: true, evaluation: payload });
}
