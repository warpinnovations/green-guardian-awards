import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import {
  Hash,
  Building2,
  Tag,
  Mail,
  Phone,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Layers,
  User,
} from "lucide-react";
import { SubmissionsFilterBar } from "./SubmissionFilterBar";

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND = { green: "#0A2724", gold: "#D4AF37" } as const;
const PAGE_SIZE = 10;

// ─── Types ────────────────────────────────────────────────────────────────────

type Submission = {
  id: string;
  created_at: string | null;
  reference_id: string;
  org_name: string;
  award_category: string;
  classification: string;
  full_name: string;
  email: string;
  contact_number: string;
};

type SearchParams = Promise<{
  page?: string;
  category?: string;
  classification?: string;
  search?: string;
}>;

// ─── Column definitions ───────────────────────────────────────────────────────

type ColumnDef = {
  key: keyof Submission | "action";
  label: string;
  icon: LucideIcon;
  className?: string;
};

const COLUMNS: ColumnDef[] = [
  { key: "reference_id", label: "Reference", icon: Hash, className: "w-36 px-4" },
  { key: "org_name", label: "Organization", icon: Building2, className: "w-52 px-4" },
  { key: "award_category", label: "Category", icon: Tag, className: "w-44 px-4" },
  { key: "classification", label: "Classification", icon: Layers, className: "w-36 px-4" },
  { key: "full_name", label: "Contact Person", icon: User, className: "w-44 px-4" },
  { key: "contact_number", label: "Contact", icon: Phone, className: "w-56 px-4" },
  { key: "created_at", label: "Submitted", icon: Calendar, className: "w-44 px-4" },
  { key: "action", label: "Action", icon: FileText, className: "w-24 px-4" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parsePage(raw: string | undefined): number {
  return Math.max(1, parseInt(raw ?? "1", 10));
}

function toRange(page: number): { from: number; to: number } {
  const from = (page - 1) * PAGE_SIZE;
  return { from, to: from + PAGE_SIZE - 1 };
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === total || Math.abs(p - current) <= 1
  );
  return pages.reduce<(number | "...")[]>((acc, p, idx, arr) => {
    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
    acc.push(p);
    return acc;
  }, []);
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function distinct(values: (string | null)[]): string[] {
  return [...new Set(values.filter((v): v is string => !!v))];
}

// ─── Supabase queries ─────────────────────────────────────────────────────────

async function fetchDistinctCategories(): Promise<string[]> {
  const { data } = await supabaseAdmin
    .from("bid_entries")
    .select("award_category")
    .order("award_category", { ascending: true });
  return distinct(data?.map((r) => r.award_category) ?? []);
}

async function fetchDistinctClassifications(): Promise<string[]> {
  const { data } = await supabaseAdmin
    .from("bid_entries")
    .select("classification")
    .order("classification", { ascending: true });
  return distinct(data?.map((r) => r.classification) ?? []);
}

async function fetchSubmissions({
  page,
  category,
  classification,
  search,
}: {
  page: number;
  category?: string;
  classification?: string;
  search?: string;
}) {
  const { from, to } = toRange(page);

  let query = supabaseAdmin
    .from("bid_entries")
    .select(
      "id, created_at, reference_id, org_name, award_category, classification, full_name, email, contact_number",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) query = query.eq("award_category", category);
  if (classification) query = query.eq("classification", classification);
  if (search)
    query = query.or(
      `org_name.ilike.%${search}%,reference_id.ilike.%${search}%,full_name.ilike.%${search}%`
    );

  return query;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TableHeader() {
  return (
    <thead>
      <tr style={{ background: `linear-gradient(to right, ${BRAND.green}05, ${BRAND.gold}05)` }}>
        {COLUMNS.map(({ key, label, icon: Icon, className }) => (
          <th key={key} className={`${className ?? "px-4"} py-4 text-left`}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 opacity-50" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                {label}
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({ row }: { row: Submission }) {
  return (
    <tr className="border-t border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
      {/* Reference */}
      <td className="w-36 px-4 py-4">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm"
          style={{ backgroundColor: `${BRAND.green}10`, color: BRAND.green, border: `1px solid ${BRAND.green}20` }}
        >
          <Hash className="w-3.5 h-3.5" />
          {row.reference_id}
        </div>
      </td>

      {/* Organization */}
      <td className="w-52 px-4 py-4">
        <div className="font-semibold text-neutral-900 text-[15px]">{row.org_name}</div>
      </td>

      {/* Category */}
      <td className="w-44 px-4 py-4">
        <div
          className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: `${BRAND.gold}20`, color: BRAND.green }}
        >
          {row.award_category}
        </div>
      </td>

      {/* Classification */}
      <td className="w-36 px-4 py-4">
        <div
          className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: `${BRAND.green}10`, color: BRAND.green, border: `1px solid ${BRAND.green}15` }}
        >
          {row.classification || "—"}
        </div>
      </td>

      {/* Contact Person */}
      <td className="w-44 px-4 py-4">
        <div className="flex items-center gap-2 text-neutral-600 text-sm">
          <User className="w-4 h-4 text-neutral-400" />
          <span className="truncate max-w-50">{row.full_name || "—"}</span>
        </div>
      </td>

      {/* Contact */}
      <td className="w-56 px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <Phone className="w-4 h-4 text-neutral-400" />
            {row.contact_number}
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span className="truncate max-w-48">{row.email || "—"}</span>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="w-44 px-4 py-4">
        <div className="text-sm text-neutral-600">{formatDate(row.created_at)}</div>
      </td>

      {/* Action */}
      <td className="w-24 px-4 py-4">
        <Link
          href={`/admin/submissions/${row.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all group-hover:shadow-md"
          style={{ backgroundColor: BRAND.green, color: "white" }}
        >
          View
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </td>
    </tr>
  );
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string>;
}) {
  function pageHref(p: number) {
    const params = new URLSearchParams({ ...searchParams, page: String(p) });
    return `?${params.toString()}`;
  }

  const pages = buildPageNumbers(currentPage, totalPages);
  const navBtnBase = "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-semibold transition-all";

  return (
    <div className="flex items-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={`${navBtnBase} hover:shadow-sm`}
          style={{ borderColor: `${BRAND.green}30`, color: BRAND.green, backgroundColor: "white" }}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      ) : (
        <span className={`${navBtnBase} opacity-30 cursor-not-allowed select-none`} style={{ borderColor: `${BRAND.green}20`, color: BRAND.green }}>
          <ChevronLeft className="w-4 h-4" /> Previous
        </span>
      )}

      <div className="flex items-center gap-1">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400 text-sm select-none">…</span>
          ) : (
            <Link
              key={p}
              href={pageHref(p)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-all"
              style={
                p === currentPage
                  ? { backgroundColor: BRAND.green, color: "white" }
                  : { backgroundColor: "white", color: BRAND.green, border: `1px solid ${BRAND.green}20` }
              }
            >
              {p}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={`${navBtnBase} hover:shadow-sm`}
          style={{ borderColor: `${BRAND.green}30`, color: BRAND.green, backgroundColor: "white" }}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`${navBtnBase} opacity-30 cursor-not-allowed select-none`} style={{ borderColor: `${BRAND.green}20`, color: BRAND.green }}>
          Next <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  searchParams: SearchParams;
}

export default async function AdminSubmissionsPage({ searchParams }: Props) {
  const { page: rawPage, category, classification, search } = await searchParams;

  const currentPage = parsePage(rawPage);
  const { from, to } = toRange(currentPage);

  // Fetch filter options and submissions in parallel
  const [categories, classifications, { data, error, count }] = await Promise.all([
    fetchDistinctCategories(),
    fetchDistinctClassifications(),
    fetchSubmissions({ page: currentPage, category, classification, search }),
  ]);

  if (error) return <div className="p-10 text-red-600">{error.message}</div>;

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

  // Carry active filters through pagination links
  const activeParams: Record<string, string> = {};
  if (category) activeParams.category = category;
  if (classification) activeParams.classification = classification;
  if (search) activeParams.search = search;

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #f6f7f8 0%, #ffffff 100%)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-6 text-white shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.green} 0%, #0d3330 100%)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full rounded-full" style={{ background: BRAND.gold }} />
        </div>

        <div className="px-2 mx-auto relative z-10">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs opacity-70 uppercase tracking-wider font-medium">Admin Dashboard</div>
              <div className="text-3xl font-bold">Submissions</div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              Total: {count ?? 0}
            </div>
            {count ? (
              <div
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              >
                Page {currentPage} of {totalPages}
              </div>
            ) : null}
            {category && (
              <div
                className="px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: "rgba(212,175,55,0.25)", color: BRAND.gold }}
              >
                Category: {category}
              </div>
            )}
            {classification && (
              <div
                className="px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: "rgba(212,175,55,0.25)", color: BRAND.gold }}
              >
                Classification: {classification}
              </div>
            )}
          </div>

          {/* Filter bar */}
          <SubmissionsFilterBar
            categories={categories}
            classifications={classifications}
            activeCategory={category ?? ""}
            activeClassification={classification ?? ""}
            activeSearch={search ?? ""}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto px-8 py-10">
        {!count ? (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-16 text-center text-neutral-500">
            No submissions match your filters.
          </div>
        ) : (
          <>
            <div className="bg-white w-full rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <TableHeader />
                  <tbody>
                    {data?.map((row) => (
                      <TableRow key={row.id} row={row as Submission} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer / Pagination */}
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Showing {from + 1}–{Math.min(to + 1, count)} of {count} submissions
                </span>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={activeParams}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}