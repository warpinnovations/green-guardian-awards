// Evaluator Dashboard Page
// displays all bids assigned to the logged-in evaluator
// fetches assigned bids from the backend (via getAssignedBids)
// calculates each bid's evaluation status (Pending or Completed),
// shows statistics (Total, Pending, Completed), and allows filtering

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardHeader from "@/app/components/DashboardHeader";
import StatCard from "@/app/components/StatCard";
import BidCard from "@/app/components/BidCard";
import { FileText, Clock, CheckCircle, Filter, X } from "lucide-react";
import { Bid, BidStatus } from "@/app/types/bid";
import { getAssignedBids } from "@/app/lib/assignedBids";

type EvalMap = Record<string, boolean>;

export default function DashboardPage() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [evalMap, setEvalMap] = useState<EvalMap>({});
  const [evalLoading, setEvalLoading] = useState(true);

  // 🔹 Load bids (backend-ready)
  useEffect(() => {
    const loadBids = async () => {
      setLoading(true);
      try {
        const data = await getAssignedBids();
        setBids(data);
      } finally {
        setLoading(false);
      }
    };

    loadBids();
  }, []);

  // 🔹 Load evaluation status
  useEffect(() => {
    if (bids.length === 0) return;

    let isCancelled = false;

    const loadEvaluations = async () => {
      setEvalLoading(true);

      try {
        const results = await Promise.all(
          bids.map(async (bid) => {
            const localKey = `evaluation:${bid.id}`;
            const hasLocal =
              typeof window !== "undefined" &&
              !!localStorage.getItem(localKey);

            if (hasLocal) return [bid.id, true] as const;

            try {
              const res = await fetch(
                `/api/evaluations?bidId=${encodeURIComponent(bid.id)}`,
                { cache: "no-store" }
              );

              if (!res.ok) return [bid.id, false] as const;

              const data = await res.json().catch(() => null);
              return [bid.id, Boolean(data?.evaluation)] as const;
            } catch {
              return [bid.id, false] as const;
            }
          })
        );

        if (isCancelled) return;

        const next: EvalMap = {};
        for (const [bidId, hasEval] of results) next[bidId] = hasEval;
        setEvalMap(next);
      } finally {
        if (!isCancelled) setEvalLoading(false);
      }
    };

    loadEvaluations();

    return () => {
      isCancelled = true;
    };
  }, [bids]);

  // 🔹 Compute status
  const bidsWithStatus: Bid[] = useMemo(() => {
    return bids.map((b) => {
      const status: BidStatus = evalMap[b.id] ? "Completed" : "Pending";
      return { ...b, status };
    });
  }, [bids, evalMap]);

  const total = bidsWithStatus.length;
  const pending = bidsWithStatus.filter((b) => b.status === "Pending").length;
  const completed = bidsWithStatus.filter((b) => b.status === "Completed").length;

  const filteredBids = bidsWithStatus.filter((bid) => {
    const matchCategory =
      filterCategory === "All" || bid.category === filterCategory;
    const matchStatus =
      filterStatus === "All" || bid.status === filterStatus;
    return matchCategory && matchStatus;
  });

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterStatus("All");
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading assigned bids…
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HeroSectionBg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Green overlay */}
      <div className="absolute inset-0 z-10 bg-[#e5ebe6]/90" />

      {/* Trophy image (decorative) */}
      <div className="pointer-events-none absolute right-0 top-32 z-10 hidden lg:block">
        <div className="relative h-[60vh] max-h-[520px] w-[28vw] max-w-[380px]">
          <Image
            src="/logos/Trophy.png"
            alt="Green Guardian Trophy"
            fill
            priority
            className="object-contain drop-shadow-[0_18px_40px_rgba(10,39,36,0.22)]"
          />
        </div>
      </div>

      {/* Main dashboard content */}
      <div className="relative z-20">
        <DashboardHeader />

        <main className="mx-auto max-w-6xl p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              title="Total Assigned"
              value={total}
              icon={<FileText />}
              color="text-indigo-500"
            />
            <StatCard
              title="Pending"
              value={pending}
              icon={<Clock />}
              color="text-yellow-500"
            />
            <StatCard
              title="Completed"
              value={completed}
              icon={<CheckCircle />}
              color="text-green-500"
            />
          </div>

          {/* Assigned bids section */}
          <section className="mt-10 rounded-2xl bg-white p-6 shadow-md transition-all duration-300">
            {/* Header + Filter button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Assigned Bids{" "}
                  <span className="text-gray-400 font-normal">
                    ({filteredBids.length})
                  </span>
                </h2>
                {evalLoading && (
                  <span className="text-xs text-gray-400">
                    Updating status…
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isFilterOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-4 w-4" />
                {isFilterOpen ? "Hide Filters" : "Filter"}
              </button>
            </div>

            {/* Filters */}
            {isFilterOpen && (
              <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-3">
                {/* Category filter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="MSMEs / Large Corporations">
                      MSMEs / Large Corporations
                    </option>
                    <option value="Local Government Units (LGUs)">
                      Local Government Units (LGUs)
                    </option>
                  </select>
                </div>

                {/* Status filter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Clear filters button */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex h-[38px] w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Bid cards */}
            <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {filteredBids.length > 0 ? (
                filteredBids.map((bid) => <BidCard key={bid.id} bid={bid} />)
              ) : (
                <div className="flex h-32 flex-col items-center justify-center text-gray-400">
                  <p>No bids found matching these filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-sm text-green-600 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
