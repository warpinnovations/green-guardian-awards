import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

type FileManifest = { name: string; type: string };

type UploadToken = { bucket: string; path: string; token: string };

type UploadsRecord = {
  dilg_document: UploadToken;
  business_permit_document: UploadToken;
  dti_sec_document: UploadToken;
  key_visual: UploadToken;
  bid_document: UploadToken;
  project_documentation: UploadToken;
  supporting_docs: UploadToken[];
  folder: string;
};

function extFromName(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && ext.length <= 8 ? ext : "bin";
}

function isPdf(type: string) {
  return type === "application/pdf";
}
function isImg(type: string) {
  return type === "image/png" || type === "image/jpeg";
}

const BUCKETS = {
  dilg_document: "dilg-docs",
  business_permit_document: "business-permit-docs",
  dti_sec_document: "dti-sec-docs",
  key_visual: "key-visuals",
  bid_document: "bid-docs",
  project_documentation: "project-documentations",
  supporting_docs: "supporting-docs",
} as const;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      dilg_document: FileManifest;
      business_permit_document: FileManifest;
      dti_sec_document: FileManifest;
      key_visual: FileManifest;
      bid_document: FileManifest;
      project_documentation: FileManifest;
      supporting_docs: FileManifest[];
    };

    // basic type validation (same logic as your server route, but on manifests)
    if (
      (!isPdf(body.bid_document.type)) ||
      (!isPdf(body.project_documentation.type)) ||
      (!isImg(body.key_visual.type)) ||
      (!(isImg(body.dilg_document.type) || isPdf(body.dilg_document.type))) ||
      (!(isImg(body.business_permit_document.type) || isPdf(body.business_permit_document.type))) ||
      (!(isImg(body.dti_sec_document.type) || isPdf(body.dti_sec_document.type)))
    ) {
      return NextResponse.json({ error: "Invalid file types." }, { status: 400 });
    }

    const folder = `submissions/${crypto.randomUUID()}`;

    async function signed(bucket: string, originalName: string) {
      const ext = extFromName(originalName);
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      // createSignedUploadUrl returns a token used by uploadToSignedUrl
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUploadUrl(path);

      if (error) throw new Error(error.message);

      return { bucket, path, token: data.token };
    }

    const uploads: UploadsRecord = {
      dilg_document: await signed(BUCKETS.dilg_document, body.dilg_document.name),
      business_permit_document: await signed(BUCKETS.business_permit_document, body.business_permit_document.name),
      dti_sec_document: await signed(BUCKETS.dti_sec_document, body.dti_sec_document.name),
      key_visual: await signed(BUCKETS.key_visual, body.key_visual.name),
      bid_document: await signed(BUCKETS.bid_document, body.bid_document.name),
      project_documentation: await signed(BUCKETS.project_documentation, body.project_documentation.name),
      supporting_docs: await Promise.all(
        (body.supporting_docs || []).map((f) => signed(BUCKETS.supporting_docs, f.name))
      ),
      folder,
    };

    return NextResponse.json(uploads, { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Init upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
