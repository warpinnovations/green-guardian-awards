import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

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
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f6f7f8 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div
        className="px-6 py-6 text-white shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.green} 0%, #0d3330 100%)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full rounded-full" style={{ background: BRAND.gold }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
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
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              Total: {data.length}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ background: `linear-gradient(to right, ${BRAND.green}05, ${BRAND.gold}05)` }}>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Reference
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Organization
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Category
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Email
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.green }}>
                        Contact
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
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
                {data.map((row, index) => (
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
                          border: `1px solid ${BRAND.green}20`
                        }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
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
                        className="inline-flex px-5 py-2.5 rounded-lg text-xs font-semibold leading-tight"
                        style={{
                          backgroundColor: `${BRAND.gold}20`,
                          color: BRAND.green
                        }}
                      >
                        {row.award_category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-600 text-sm">
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span className="truncate max-w-[200px]">{row.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-600 text-sm">
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {row.contact_number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">
                        {new Date(row.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {row.id && (
                        <Link
                          href={`/admin/submissions/${row.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all group-hover:shadow-md"
                          style={{
                            backgroundColor: BRAND.green,
                            color: 'white'
                          }}
                        >
                          <span>View</span>
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Showing all {data.length} submissions</span>
          </div>
          <div className="text-xs">
            Last updated: {new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}