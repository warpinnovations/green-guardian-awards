import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

const BRAND = {
  green: "#0A2724",
  gold: "#D4AF37",
  bg: "#f6f7f8",
};


const BUCKETS = {
  authorization: "authorization-forms",
  businessPermit: "business-permit-docs",
  dtiSec: "dti-sec-docs",
  keyVisuals: "key-visuals",
  bidDocs: "bid-docs",
  projectDocs: "project-documentations",
  supporting: "supporting-docs",
} as const;


type BidEntryRow = {
  id: string;
  created_at: string | null;
  reference_id: string | null;

  org_name: string | null;
  org_address: string | null;
  classification: string | null;
  website: string | null;
  facebook_page: string | null;
  company_description: string | null;

  full_name: string | null;
  position: string | null;
  email: string | null;
  contact_number: string | null;

  alt_contact_person: string | null;
  alt_contact_number: string | null;
  alt_email: string | null;

  award_category: string | null;
  project_title: string | null;
  project_description: string | null;
  video_link: string | null;

  authorization_form_doc_path: string | null;
  business_permit_path: string | null;
  dti_sec_permit_path: string | null;

  key_visual_path: string | null;
  bid_doc_path: string | null;
  project_doc_path: string | null;
  supporting_doc_paths: string[] | null;

  data_privacy_consent: boolean | null;
  terms_accepted: boolean | null;
  info_certified: boolean | null;
};

type SignedResult =
  | { ok: true; url: string }
  | { ok: false; reason: string };


const isImage = (p: string) => /\.(png|jpg|jpeg|webp)$/i.test(p);
const isPdf = (p: string) => /\.pdf$/i.test(p);
const filename = (p: string) => p.split("/").pop() ?? "file";

function format(value: unknown): string {
  if (!value) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

async function sign(
  bucket: string,
  path?: string | null,
): Promise<SignedResult> {
  if (!path) return { ok: false, reason: "No file" };

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 60);

  if (error || !data?.signedUrl)
    return { ok: false, reason: error?.message ?? "No URL" };

  return { ok: true, url: data.signedUrl };
}


function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="py-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors px-1 -mx-1 rounded">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
        {label}
      </div>
      <div className="text-[15px] text-neutral-800 break-words leading-relaxed">
        {format(value)}
      </div>
    </div>
  );
}

function PreviewButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      style={{
        backgroundColor: BRAND.green,
        color: 'white',
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      Preview
    </a>
  );
}

function FileBlock({
  label,
  path,
  signed,
}: {
  label: string;
  path: string | null;
  signed: SignedResult;
}) {
  const name = path ? filename(path) : "—";

  return (
    <div className="py-5 border-b border-neutral-100 last:border-0">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            {label}
          </div>
          <div className="text-[15px] text-neutral-800 font-medium flex items-center gap-2">
            {path && (
              <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            <span className="truncate">{name}</span>
          </div>

          {!signed.ok && path && (
            <div className="text-xs text-red-500 mt-2 bg-red-50 px-2 py-1 rounded inline-block">
              ⚠️ {signed.reason}
            </div>
          )}
        </div>

        {signed.ok && <PreviewButton href={signed.url} />}
      </div>

      {signed.ok && path && isImage(path) && (
        <div className="mt-4 rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
          <img
            src={signed.url}
            alt={name}
            className="w-full max-h-96 object-contain bg-neutral-50"
          />
        </div>
      )}
    </div>
  );
}


export default async function AdminSubmissionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("bid_entries")
    .select("*")
    .eq("id", id)
    .single<BidEntryRow>();

  if (error) return <div className="p-10 text-red-600">{error.message}</div>;
  if (!data) return <div className="p-10">Not found</div>;

  /* SIGNED URLS */
  const keyVisual = await sign(BUCKETS.keyVisuals, data.key_visual_path);
  const bidDoc = await sign(BUCKETS.bidDocs, data.bid_doc_path);
  const projectDoc = await sign(BUCKETS.projectDocs, data.project_doc_path);
  const auth = await sign(BUCKETS.authorization, data.authorization_form_doc_path);
  const permit = await sign(BUCKETS.businessPermit, data.business_permit_path);
  const dti = await sign(BUCKETS.dtiSec, data.dti_sec_permit_path);

  const supporting = await Promise.all(
    (data.supporting_doc_paths ?? []).map(async (p) => ({
      path: p,
      signed: await sign(BUCKETS.supporting, p),
    })),
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f6f7f8 0%, #ffffff 100%)' }}>
      <div
        className="px-6 py-6 text-white shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.green} 0%, #0d3330 100%)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full rounded-full" style={{ background: BRAND.gold }}></div>
        </div>

        <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
          <div>
            <div className="text-xs opacity-70 uppercase tracking-wider font-medium mb-1">
              Admin Dashboard
            </div>
            <div className="text-2xl font-bold">Submission Details</div>
          </div>
          <div
            className="rounded-full px-5 py-2 text-sm font-bold shadow-lg"
            style={{
              background: 'white',
              color: BRAND.green,
              border: `2px solid ${BRAND.gold}`
            }}
          >
            {data.reference_id}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/admin/submissions"
          className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all mb-8 group"
          style={{ color: BRAND.green }}
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Submissions
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            {data.project_title || `Submission ${data.reference_id}`}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {data.created_at && new Date(data.created_at).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </div>
            {data.award_category && (
              <>
                <span className="text-neutral-300">•</span>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${BRAND.gold}20`,
                    color: BRAND.green
                  }}
                >
                  {data.award_category}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-neutral-200 p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: BRAND.gold }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND.green}10` }}
              >
                <svg className="w-5 h-5" style={{ color: BRAND.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Organization Details</h2>
            </div>

            <Field label="Organization" value={data.org_name} />
            <Field label="Address" value={data.org_address} />
            <Field label="Classification" value={data.classification} />
            <Field label="Website" value={data.website} />
            <Field label="Facebook Page" value={data.facebook_page} />
            <Field label="Company Description" value={data.company_description} />
            <Field label="Full Name" value={data.full_name} />
            <Field label="Position" value={data.position} />
            <Field label="Email" value={data.email} />
            <Field label="Contact Number" value={data.contact_number} />
            <Field label="Award Category" value={data.award_category} />
            <Field label="Project Title" value={data.project_title} />
            <Field label="Project Description" value={data.project_description} />
            <Field label="Video Link" value={data.video_link} />
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: BRAND.gold }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND.green}10` }}
              >
                <svg className="w-5 h-5" style={{ color: BRAND.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Attachments</h2>
            </div>

            <FileBlock label="Key Visual" path={data.key_visual_path} signed={keyVisual} />
            <FileBlock label="Bid Document" path={data.bid_doc_path} signed={bidDoc} />
            <FileBlock label="Project Document" path={data.project_doc_path} signed={projectDoc} />
            <FileBlock label="Authorization Form" path={data.authorization_form_doc_path} signed={auth} />
            <FileBlock label="Business Permit" path={data.business_permit_path} signed={permit} />
            <FileBlock label="DTI / SEC Permit" path={data.dti_sec_permit_path} signed={dti} />

            <div className="pt-6 mt-2 border-t-2" style={{ borderColor: `${BRAND.gold}40` }}>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Supporting Documents
                </div>
              </div>

              {supporting.length === 0 && (
                <div className="text-sm text-neutral-400 py-4 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                  No supporting documents
                </div>
              )}

              {supporting.map(({ path, signed }) => (
                <FileBlock
                  key={path}
                  label="Supporting File"
                  path={path}
                  signed={signed}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}