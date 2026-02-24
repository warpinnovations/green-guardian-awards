import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const BRAND = {
  green: "#0A2724",
  gold: "#D4AF37",
  bg: "#f6f7f8",
};

interface Submission {
  id: string;
  created_at: string;
  reference_id: string;
  org_name: string;
  award_category: string;
  email: string;
  contact_number: string;
}

const ROWS_PER_PAGE = 10;

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const start = (page - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE - 1; // Supabase range is inclusive

  // Fetch only the rows for the current page
  const { data, count, error } = await supabaseAdmin
    .from("bid_entries")
    .select(
      "id, created_at, reference_id, org_name, award_category, email, contact_number",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) return <div className="p-10 text-red-600">{error.message}</div>;
  if (!data?.length) return <div className="p-10">No submissions yet.</div>;

  const submissions = data as Submission[];
  const totalPages = Math.ceil((count || 0) / ROWS_PER_PAGE);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #f6f7f8 0%, #ffffff 100%)",
      }}
    >
      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-neutral-100 hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">{row.reference_id}</td>
                    <td className="px-6 py-4">{row.org_name}</td>
                    <td className="px-6 py-4">{row.award_category}</td>
                    <td className="px-6 py-4">{row.email}</td>
                    <td className="px-6 py-4">{row.contact_number}</td>
                    <td className="px-6 py-4">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/submissions/${row.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm"
                        style={{ backgroundColor: BRAND.green, color: "white" }}
                      >
                        View <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center gap-2">
          {/* Previous button */}
          <Link
            href={`/admin/submissions?page=${Math.max(1, page - 1)}`}
            className={`px-3 py-1 rounded-lg font-semibold ${page === 1
                ? "bg-gray-200 text-gray-400 pointer-events-none"
                : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
          >
            Previous
          </Link>

          {/* Numeric pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/submissions?page=${p}`}
              className={`px-3 py-1 rounded-lg font-semibold ${p === page
                  ? "bg-green-700 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              {p}
            </Link>
          ))}

          {/* Next button */}
          <Link
            href={`/admin/submissions?page=${Math.min(totalPages, page + 1)}`}
            className={`px-3 py-1 rounded-lg font-semibold ${page === totalPages
                ? "bg-gray-200 text-gray-400 pointer-events-none"
                : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
          >
            Next
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Showing page {page} of {totalPages}
            </span>
          </div>
          <div className="text-xs">Last updated: {new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}