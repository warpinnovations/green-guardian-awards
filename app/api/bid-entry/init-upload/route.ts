import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

type FileManifest = { name: string; type: string };
type UploadToken = { bucket: string; path: string; token: string };

type UploadsRecord = {
  authorization_form_document?: UploadToken; // LGU only
  business_permit_document?: UploadToken; // MSME only
  dti_sec_document?: UploadToken; // MSME only
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

const isPdf = (type: string) => type === "application/pdf";
const isImg = (type: string) =>
  type === "image/png" || type === "image/jpeg";
const isImgOrPdf = (type: string) => isImg(type) || isPdf(type);

const BUCKETS = {
  authorization_form_document: "authorization-forms",
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
      /** determines required documents */
      track: "Local Government Unit" | "Business";
      authorization_form_document?: FileManifest;
      business_permit_document?: FileManifest;
      dti_sec_document?: FileManifest;

      key_visual: FileManifest;
      bid_document: FileManifest;
      project_documentation: FileManifest;

      supporting_docs?: FileManifest[];
    };

    const isLGU = body.track === "Local Government Unit";
    const isMSME = body.track === "Business";

    // --- required (always) ---
    if (
      !body.track ||
      !body.key_visual ||
      !body.bid_document ||
      !body.project_documentation
    ) {
      return NextResponse.json(
        { error: "Missing required file manifests." },
        { status: 400 },
      );
    }

    // --- required by track ---
    if (isLGU && !body.authorization_form_document) {
      return NextResponse.json(
        { error: "Authorization form is required for LGU." },
        { status: 400 },
      );
    }

    if (isMSME && (!body.business_permit_document || !body.dti_sec_document)) {
      return NextResponse.json(
        {
          error:
            "Business permit and DTI/SEC permit are required for MSME.",
        },
        { status: 400 },
      );
    }

    // --- type validation (only what applies) ---
    if (
      !isImg(body.key_visual.type) ||
      !isPdf(body.bid_document.type) ||
      !isPdf(body.project_documentation.type) ||
      (isLGU &&
        body.authorization_form_document &&
        !isPdf(body.authorization_form_document.type)) ||
      (isMSME &&
        body.business_permit_document &&
        !isImgOrPdf(body.business_permit_document.type)) ||
      (isMSME &&
        body.dti_sec_document &&
        !isImgOrPdf(body.dti_sec_document.type))
    ) {
      return NextResponse.json(
        { error: "Invalid file types." },
        { status: 400 },
      );
    }

    const folder = `submissions/${crypto.randomUUID()}`;

    async function signed(bucket: string, originalName: string) {
      const ext = extFromName(originalName);
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUploadUrl(path);

      if (error) throw new Error(error.message);

      return { bucket, path, token: data.token };
    }

    const uploads: UploadsRecord = {
      ...(isLGU && body.authorization_form_document
        ? {
          authorization_form_document: await signed(
            BUCKETS.authorization_form_document,
            body.authorization_form_document.name,
          ),
        }
        : {}),
      ...(isMSME && body.business_permit_document
        ? {
          business_permit_document: await signed(
            BUCKETS.business_permit_document,
            body.business_permit_document.name,
          ),
        }
        : {}),
      ...(isMSME && body.dti_sec_document
        ? {
          dti_sec_document: await signed(
            BUCKETS.dti_sec_document,
            body.dti_sec_document.name,
          ),
        }
        : {}),
      key_visual: await signed(
        BUCKETS.key_visual,
        body.key_visual.name,
      ),
      bid_document: await signed(
        BUCKETS.bid_document,
        body.bid_document.name,
      ),
      project_documentation: await signed(
        BUCKETS.project_documentation,
        body.project_documentation.name,
      ),
      supporting_docs: await Promise.all(
        (body.supporting_docs || []).map((f) =>
          signed(BUCKETS.supporting_docs, f.name),
        ),
      ),
      folder,
    };

    return NextResponse.json(uploads, { status: 200 });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Init upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
