"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Criterion {
    id: string;
    title: string;
    description: string;
    weight: number;
}

interface ScoreCriterionProps {
    index: number;
    criterion: Criterion;
    locked: boolean;
    initialScore?: number;
    onScoreChange: (id: string, score: number) => void;
}

function ScoreCriterion({
    index,
    criterion,
    locked,
    initialScore = 0,
    onScoreChange,
}: ScoreCriterionProps) {
    const [score, setScore] = useState<number>(initialScore);
    const [hover, setHover] = useState<number>(0);
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        setScore(initialScore);
    }, [initialScore]);

    const weightedScore = score ? (score / 5) * criterion.weight : 0;

    const handleScore = (value: number) => {
        if (locked) return;
        setScore(value);
        onScoreChange(criterion.id, value);
    };

    return (
        <div className="rounded-2xl bg-[#2b5741] p-7 shadow-md border border-white/15 space-y-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-[20px] font-semibold text-white">
                        {index}. {criterion.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/75 max-w-2xl">
                        {criterion.description}
                    </p>
                </div>

                <span className="shrink-0 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                    Weight {criterion.weight}%
                </span>
            </div>

            <div className="mt-2">
                <div className="relative mb-3">
                    <span className="absolute left-0 text-[11px] text-white/65">Poor</span>
                    <span className="absolute right-0 text-[11px] text-white/65">Excellent</span>

                    <span className="block text-center text-[11px] text-white/70">
                        Rating: <span className="font-semibold text-white">{score || 0}</span>/5
                    </span>
                </div>

                <div className="flex justify-between w-full max-w-3xl mx-auto px-2">
                    {[1, 2, 3, 4, 5].map((value) => {
                        const active = value <= (hover || score);

                        return (
                            <button
                                key={value}
                                type="button"
                                disabled={locked}
                                onMouseEnter={() => !locked && setHover(value)}
                                onMouseLeave={() => !locked && setHover(0)}
                                onFocus={() => !locked && setHover(value)}
                                onBlur={() => !locked && setHover(0)}
                                onClick={() => handleScore(value)}
                                className={`rounded-md p-1 transition-transform active:scale-95
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60
                  ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                                aria-label={`Rate ${value} out of 5`}
                            >
                                <Star
                                    size={36}
                                    className={`transition-colors ${active
                                        ? "fill-emerald-300 text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.25)]"
                                        : "text-white/45"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Optional remarks or justification"
                readOnly={locked}
                className={`w-full resize-none rounded-xl bg-white/5 border border-white/10
          px-4 py-3 text-[13px] text-white placeholder:text-white/40
          focus:outline-none focus:ring-2 focus:ring-emerald-400/40
          h-12 focus:h-24 transition-[height]
          ${locked ? "opacity-70 cursor-not-allowed" : ""}`}
            />

            <div className="flex justify-end">
                <div className="text-right">
                    <p className="text-[11px] text-white/65">Weighted Score</p>
                    <p className="text-[13px] font-semibold text-white">
                        {weightedScore.toFixed(1)} / {criterion.weight}
                    </p>
                </div>
            </div>
        </div>
    );
}

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

export default function Page({ params }: { params: { bidId: string } }) {
    const bidId = params.bidId;
    const router = useRouter();

    const criteria: Criterion[] = useMemo(
        () => [
            {
                id: "impact",
                title: "Environmental Impact",
                description:
                    "Measurable positive effects on the environment (waste reduction, emissions, biodiversity, etc.)",
                weight: 30,
            },
            {
                id: "innovation",
                title: "Innovation & Creativity",
                description: "Originality, creativity, and innovative use of approaches or technology.",
                weight: 20,
            },
            {
                id: "sustainability",
                title: "Sustainability & Scalability",
                description: "Long-term viability and potential for replication in other LGUs or organizations.",
                weight: 20,
            },
            {
                id: "community",
                title: "Community Engagement",
                description: "Level of community participation, awareness, and involvement.",
                weight: 15,
            },
            {
                id: "implementation",
                title: "Implementation Quality",
                description: "Execution quality, project management, and adherence to timelines.",
                weight: 10,
            },
            {
                id: "documentation",
                title: "Documentation & Reporting",
                description: "Clarity, completeness, and quality of submitted documents and reporting.",
                weight: 5,
            },
        ],
        []
    );

    const [scores, setScores] = useState<Record<string, number>>({});
    const [error, setError] = useState<string | null>(null);
    const [overallRemarks, setOverallRemarks] = useState("");
    const [evaluatorName, setEvaluatorName] = useState("");
    const [evaluatorEmail, setEvaluatorEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [loadedEval, setLoadedEval] = useState<EvaluationRecord | null>(null);

    useEffect(() => {
        const safeBidId = String(bidId ?? "").trim();
        if (!safeBidId) return;

        const load = async () => {
            try {
                const res = await fetch(`/api/evaluations?bidId=${encodeURIComponent(safeBidId)}`, {
                    cache: "no-store",
                });
                const data = await res.json().catch(() => null);

                if (data?.evaluation) {
                    const ev = data.evaluation as EvaluationRecord;
                    setLoadedEval(ev);
                    setScores(ev.scores || {});
                    setOverallRemarks(ev.overallRemarks || "");
                    setEvaluatorName(ev.evaluatorName || "");
                    setEvaluatorEmail(ev.evaluatorEmail || "");
                    setIsLocked(true);
                }
            } catch { }
        };

        load();
    }, [bidId]);

    const handleScoreChange = (id: string, value: number) => {
        if (isLocked) return;
        setScores((prev) => ({ ...prev, [id]: value }));
        setError(null);
    };

    const overallScore = criteria.reduce((total, c) => {
        const s = scores[c.id];
        if (!s) return total;
        return total + (s / 5) * c.weight;
    }, 0);

    const allCriteriaScored = criteria.every((c) => Boolean(scores[c.id]));

    const handleSubmit = async () => {
        if (isLocked) return;

        if (!evaluatorEmail.trim()) {
            setError("Evaluator email is required before submitting.");
            return;
        }

        if (!allCriteriaScored) {
            setError("Please score all criteria before submitting.");
            return;
        }

        if (!overallRemarks.trim()) {
            setError("Overall remarks are required before submitting.");
            return;
        }

        const safeBidId = String(bidId ?? "").trim();
        if (!safeBidId) {
            setError("Missing bid id. Please reload the page.");
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            const payload: EvaluationRecord = {
                bidId: safeBidId,
                evaluatorName: evaluatorName.trim(),
                evaluatorEmail: evaluatorEmail.trim(),
                scores,
                overallScore: Number(overallScore.toFixed(1)),
                overallRemarks: overallRemarks.trim(),
                status: "Completed",
                submittedAt: new Date().toISOString(),
            };

            const res = await fetch("/api/evaluations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);

            if (res.status === 409) {
                setError(data?.error ?? "This evaluation was already submitted and is now locked.");
                setIsLocked(true);
                return;
            }

            if (!res.ok) {
                setError(data?.error ?? `Failed to submit evaluation. (${res.status})`);
                return;
            }

            localStorage.setItem(`evaluation:${safeBidId}`, JSON.stringify(payload));
            setIsLocked(true);
            router.push(`/dashboard/evaluate/${safeBidId}/success`);
        } catch {
            setError("Something went wrong while submitting. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Evaluation Scoresheet</h1>
                    <p className="text-sm text-white/70 mt-1">Bid ID: {bidId}</p>
                    {isLocked && (
                        <p className="text-[12px] text-emerald-200 mt-2">
                            Status: Completed
                            {loadedEval?.submittedAt
                                ? ` • Submitted: ${new Date(loadedEval.submittedAt).toLocaleString()}`
                                : ""}
                        </p>
                    )}
                </div>

                <Link
                    href="/dashboard"
                    className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold 
            px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/20
            hover:bg-white/20 transition"
                >
                    ← Back
                </Link>
            </div>

            <div className="rounded-2xl bg-[#244c3a] p-6 border border-white/10 space-y-3">
                <p className="text-sm font-semibold text-white">Evaluator Information</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[12px] text-white/70">Evaluator Name</label>
                        <input
                            value={evaluatorName}
                            onChange={(e) => setEvaluatorName(e.target.value)}
                            placeholder="Juan Dela Cruz"
                            readOnly={isLocked}
                            className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-emerald-400/40
                ${isLocked ? "opacity-70 cursor-not-allowed" : ""}`}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[12px] text-white/70">Evaluator Email</label>
                        <input
                            value={evaluatorEmail}
                            onChange={(e) => setEvaluatorEmail(e.target.value)}
                            placeholder="evaluator@email.com"
                            readOnly={isLocked}
                            className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-emerald-400/40
                ${isLocked ? "opacity-70 cursor-not-allowed" : ""}`}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {criteria.map((criterion, index) => (
                    <ScoreCriterion
                        key={criterion.id}
                        index={index + 1}
                        criterion={criterion}
                        locked={isLocked}
                        initialScore={scores[criterion.id] || 0}
                        onScoreChange={handleScoreChange}
                    />
                ))}
            </div>

            <div className="rounded-2xl bg-[#244c3a] p-6 border border-white/10 space-y-3">
                <p className="text-sm font-semibold text-white">Overall Remarks (Required)</p>
                <p className="text-[13px] text-white/70">
                    Summarize strengths, weaknesses, and your overall assessment of the project.
                </p>

                <textarea
                    value={overallRemarks}
                    onChange={(e) => setOverallRemarks(e.target.value)}
                    placeholder="Write your overall evaluation here..."
                    rows={5}
                    readOnly={isLocked}
                    className={`w-full resize-none rounded-xl bg-white/5 border border-white/10
            px-4 py-3 text-[13px] text-white placeholder:text-white/40
            focus:outline-none focus:ring-2 focus:ring-emerald-400/40
            ${isLocked ? "opacity-70 cursor-not-allowed" : ""}`}
                />
            </div>

            <div className="rounded-2xl bg-[#244c3a] p-6 border border-white/10 flex items-end justify-between gap-6">
                <div>
                    <p className="text-sm text-white/70">Overall Score</p>
                    <p className="text-4xl font-bold text-emerald-300">{overallScore.toFixed(1)} / 100</p>
                    <p className="text-[12px] text-white/60 mt-1">
                        Calculated automatically based on weights and selected ratings.
                    </p>
                </div>

                <div className="text-right">
                    {!allCriteriaScored ? (
                        <p className="text-[12px] text-white/60">
                            {Object.keys(scores).length}/{criteria.length} criteria scored
                        </p>
                    ) : (
                        <p className="text-[12px] text-emerald-200">All criteria completed</p>
                    )}
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3">
                    <p className="text-sm text-red-200">{error}</p>
                </div>
            )}

            <div className="flex justify-end gap-3">
                {isLocked && (
                    <Link
                        href={`/dashboard/evaluate/${String(bidId ?? "").trim()}/print`}
                        className="rounded-xl px-7 py-3.5 font-semibold transition
              bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    >
                        Print Scoresheet
                    </Link>
                )}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!allCriteriaScored || isSubmitting || isLocked}
                    className={`rounded-xl px-7 py-3.5 font-semibold transition
            ${allCriteriaScored && !isSubmitting && !isLocked
                            ? "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                            : "bg-white/10 text-white/40 cursor-not-allowed"
                        }`}
                >
                    {isLocked ? "Evaluation Submitted" : isSubmitting ? "Submitting..." : "Submit Evaluation"}
                </button>
            </div>
        </div>
    );
}
