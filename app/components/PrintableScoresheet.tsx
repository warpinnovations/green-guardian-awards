"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { mockBids } from "@/app/data/mockBids";

type EvaluationRecord = {
    bidId: string;
    evaluatorName?: string;
    evaluatorEmail?: string;
    scores: Record<string, number>;
    overallScore: number;
    overallRemarks: string;
    status: "Completed";
    submittedAt: string;
};

type Criterion = {
    id: string;
    title: string;
    weight: number;
};

export default function PrintableScoresheet({ bidId }: { bidId: string }) {
    const [evaluation, setEvaluation] = useState<EvaluationRecord | null>(null);
    const [loading, setLoading] = useState(true);

    const criteria: Criterion[] = useMemo(
        () => [
            { id: "impact", title: "Environmental Impact", weight: 30 },
            { id: "innovation", title: "Innovation & Creativity", weight: 20 },
            { id: "sustainability", title: "Sustainability & Scalability", weight: 20 },
            { id: "community", title: "Community Engagement", weight: 15 },
            { id: "implementation", title: "Implementation Quality", weight: 10 },
            { id: "documentation", title: "Documentation & Reporting", weight: 5 },
        ],
        []
    );

    const bid = useMemo(() => mockBids.find((b) => b.id === bidId) || null, [bidId]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/evaluations?bidId=${encodeURIComponent(bidId)}`, {
                    cache: "no-store",
                });
                const data = await res.json().catch(() => null);
                setEvaluation(data?.evaluation ?? null);
            } catch {
                setEvaluation(null);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [bidId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white p-10">
                <p className="text-gray-600">Loading printable scoresheet…</p>
            </div>
        );
    }

    if (!bid) {
        return (
            <div className="min-h-screen bg-white p-10">
                <p className="text-gray-800 font-semibold">Bid not found</p>
                <Link className="text-blue-600 underline" href="/dashboard">
                    Back to dashboard
                </Link>
            </div>
        );
    }

    if (!evaluation) {
        return (
            <div className="min-h-screen bg-white p-10 space-y-3">
                <p className="text-gray-900 font-semibold">No evaluation found for this bid.</p>
                <p className="text-gray-600 text-sm">
                    Submit an evaluation first to generate the printable scoresheet.
                </p>
                <div className="flex gap-3">
                    <Link className="text-blue-600 underline" href={`/dashboard/evaluate/${bidId}`}>
                        Go to evaluation
                    </Link>
                    <Link className="text-blue-600 underline" href="/dashboard">
                        Back to dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const submittedAt = evaluation.submittedAt
        ? new Date(evaluation.submittedAt).toLocaleString()
        : "";

    return (
        <div className="min-h-screen bg-white text-black">
            <style>{`
        @page { margin: 16mm; }
      `}</style>

            <div className="mx-auto max-w-3xl p-8 print:p-0">
                <div className="flex items-start justify-between gap-4 border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-extrabold">Green Guardian Awards</h1>
                        <p className="text-sm text-gray-600">Evaluator Scoresheet</p>
                    </div>

                    <div className="flex gap-3 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            Print / Save as PDF
                        </button>

                        <Link
                            href={`/dashboard/bids/${bidId}`}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            Back
                        </Link>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                    <div className="rounded-xl border p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Project Information
                        </p>
                        <div className="mt-3 space-y-1">
                            <p className="text-sm">
                                <span className="font-semibold">Project Name:</span> {bid.title}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Organization:</span> {bid.organization}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Category:</span> {bid.category}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Evaluator Information
                        </p>
                        <div className="mt-3 space-y-1">
                            <p className="text-sm">
                                <span className="font-semibold">Name:</span>{" "}
                                {evaluation.evaluatorName || "—"}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Email:</span>{" "}
                                {evaluation.evaluatorEmail || "—"}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Date Submitted:</span> {submittedAt || "—"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-xl border overflow-hidden">
                    <div className="px-4 py-3 border-b">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Scores per Criterion
                        </p>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-2 font-semibold">Criterion</th>
                                <th className="text-right px-4 py-2 font-semibold">Weight</th>
                                <th className="text-right px-4 py-2 font-semibold">Score (1–5)</th>
                                <th className="text-right px-4 py-2 font-semibold">Weighted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criteria.map((c) => {
                                const raw = evaluation.scores?.[c.id] ?? 0;
                                const weighted = raw ? (raw / 5) * c.weight : 0;

                                return (
                                    <tr key={c.id} className="border-t">
                                        <td className="px-4 py-3">{c.title}</td>
                                        <td className="px-4 py-3 text-right">{c.weight}%</td>
                                        <td className="px-4 py-3 text-right">{raw || "—"}</td>
                                        <td className="px-4 py-3 text-right">{weighted.toFixed(1)}</td>
                                    </tr>
                                );
                            })}

                            <tr className="border-t bg-gray-50">
                                <td className="px-4 py-3 font-semibold">Total</td>
                                <td className="px-4 py-3" />
                                <td className="px-4 py-3" />
                                <td className="px-4 py-3 text-right font-extrabold">
                                    {Number(evaluation.overallScore).toFixed(1)} / 100
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 rounded-xl border p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Overall Remarks
                    </p>
                    <p className="mt-3 text-sm whitespace-pre-wrap leading-relaxed">
                        {evaluation.overallRemarks || "—"}
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-6">
                    <div className="border-t pt-3">
                        <p className="text-xs text-gray-600">Evaluator Signature</p>
                    </div>
                    <div className="border-t pt-3">
                        <p className="text-xs text-gray-600">Date</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
