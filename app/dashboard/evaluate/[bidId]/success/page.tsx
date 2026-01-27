"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function EvaluationSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const t = setTimeout(() => {
            router.replace("/dashboard");
            router.refresh();

        }, 2500);

        return () => clearTimeout(t);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(circle_at_top_center,rgba(170,190,60,0.35),rgba(40,90,60,0.9)_35%),
      linear-gradient(105deg,#ffff,#0f3d1f,#1a7f3a)]"
        >
            <div className="w-full max-w-4xl rounded-3xl bg-white/95 border border-black/5 shadow-2xl p-10 sm:p-14">
                <div className="flex flex-col items-center text-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="text-emerald-600" size={52} />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Evaluation Submitted Successfully
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                        Your evaluation has been recorded and the bid status has been updated.
                    </p>

                    <p className="text-sm sm:text-base text-slate-500 mt-4">
                        Redirecting to dashboard...
                    </p>

                    <div className="mt-3">
                        <Link
                            href="/dashboard"
                            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline"
                        >
                            Go now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
