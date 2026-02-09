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
  AtSign,
} from "lucide-react";

const BRAND = {
  green: "#0A2724",
  gold: "#D4AF37",
  bg: "#f6f7f8",
};

export default async function AdminSubmissionsPage() {
  const { data, error } = await supabaseAdmin
    .from("bid_entries")
    .select("id, created_at, reference_id, org_name, award_category, email, contact_number")
    .order("created_at", { ascending: false });

  if (error) return <div className="p-10 text-red-600">{error.message}</div>;
  if (!data?.length) return <div className="p-10">No submissions yet.</div>;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #f6f7f8 0%, #ffffff 100%)" }}>
      {/* Header */}
      <div
        className="px-6 py-6 text-white shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.green} 0%, #0d3330 100%)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full rounded-full" style={{ background: BRAND.gold }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs opacity-70 uppercase tracking-wider font-medium">
                Admin Dashboard
              </div>
              <div className="text-3xl font-bold">Submissions</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              Total: {data.length}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ background: `linear-gradient(to right, ${BRAND.green}05, ${BRAND.gold}05)` }}>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Reference
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Organization
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Category
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Email
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Contact
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Submitted
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-neutral-100 hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm"
                        style={{
                          backgroundColor: `${BRAND.green}10`,
                          color: BRAND.green,
                          border: `1px solid ${BRAND.green}20`,
                        }}
                      >
                        <Hash className="w-3.5 h-3.5" />
                        {row.reference_id}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900 text-[15px]">
                        {row.org_name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="inline-flex px-5 py-2.5 rounded-lg text-xs font-semibold"
                        style={{
                          backgroundColor: `${BRAND.gold}20`,
                          color: BRAND.green,
                        }}
                      >
                        {row.award_category}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-600 text-sm">
                        <AtSign className="w-4 h-4 text-neutral-400" />
                        <span className="truncate max-w-[200px]">{row.email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-600 text-sm">
                        <Phone className="w-4 h-4 text-neutral-400" />
                        {row.contact_number}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">
                        {new Date(row.created_at!).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Showing all {data.length} submissions</span>
          </div>
          <div className="text-xs">
            Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
