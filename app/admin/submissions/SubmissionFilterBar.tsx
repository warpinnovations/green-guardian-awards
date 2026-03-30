"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, ChevronDown, X, Loader2 } from "lucide-react";

const BRAND = { green: "#0A2724", gold: "#D4AF37" } as const;

interface Props {
  categories: string[];
  activeCategory: string;
  activeSearch: string;
}

export function SubmissionsFilterBar({ categories, activeCategory, activeSearch }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const buildHref = useCallback((overrides: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // always reset to page 1 on filter change
    Object.entries(overrides).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    return `?${params.toString()}`;
  }, [searchParams]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => router.push(buildHref({ search: e.target.value })));
    },
    [buildHref, router]
  );

  const handleCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      startTransition(() => router.push(buildHref({ category: e.target.value })));
    },
    [buildHref, router]
  );

  const handleClearAll = useCallback(() => {
    startTransition(() => router.push("?"));
  }, [router]);

  const hasActiveFilters = !!activeCategory || !!activeSearch;

  return (
    <div className="flex flex-wrap items-center gap-3 mt-5 relative z-10">

      {/* Search input */}
      <div className="relative min-w-[220px] flex-1 max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: "rgba(255,255,255,0.45)" }}
        />
        <input
          type="text"
          placeholder="Search org, reference, email…"
          defaultValue={activeSearch}
          onChange={handleSearch}
          className="w-full pl-9 pr-4 py-2 rounded-lg text-sm font-medium placeholder:font-normal outline-none transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
          }}
        />
      </div>

      {/* Category dropdown */}
      <div className="relative">
        <select
          value={activeCategory}
          onChange={handleCategory}
          className="appearance-none pl-4 pr-9 py-2 rounded-lg text-sm font-semibold outline-none cursor-pointer transition-all"
          style={{
            backgroundColor: activeCategory
              ? BRAND.gold
              : "rgba(255,255,255,0.12)",
            border: activeCategory
              ? `1px solid ${BRAND.gold}`
              : "1px solid rgba(255,255,255,0.2)",
            color: activeCategory ? BRAND.green : "white",
            minWidth: "180px",
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: activeCategory ? BRAND.green : "rgba(255,255,255,0.6)" }}
        />
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}

      {/* Pending spinner */}
      {isPending && (
        <Loader2
          className="w-4 h-4 animate-spin"
          style={{ color: "rgba(255,255,255,0.6)" }}
        />
      )}
    </div>
  );
}