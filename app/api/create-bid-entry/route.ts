import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { NextResponse } from "next/server";

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const org_name = String(fd.get("org_name") || "").trim();
    const org_address = String(fd.get("org_address") || "").trim();

    const full_name = String(fd.get("full_name") || "").trim();
    const position = String(fd.get("position") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const contact_number = String(fd.get("contact_number") || "").trim();
    const website = String(fd.get("website") || "").trim() || null;
    const company_description = String(fd.get("company_description") || "").trim() || null;

    const alt_contact_person = String(fd.get("alt_contact_person") || "").trim() || null;
    const alt_contact_number = String(fd.get("alt_contact_number") || "").trim() || null;
    const alt_email = String(fd.get("alt_email") || "").trim() || null;

    const award_category = String(fd.get("award_category") || "").trim();
    const project_title = String(fd.get("project_title") || "").trim();
    const project_description = String(fd.get("project_description") || "").trim();
    const video_link = String(fd.get("video_link") || "").trim() || null;

    const dilg_document = fd.get("dilg_document") as File | null;
    const business_permit_document = fd.get("business_permit_document") as File | null;
    const dti_sec_document = fd.get("dti_sec_document") as File | null;
    const key_visual = fd.get("key_visual") as File | null;
    const bid_document = fd.get("bid_document") as File | null;
    const project_documentation = fd.get("project_documentation") as File | null;
    const supporting_docs = fd.getAll("supporting_docs") as File[];

    const data_privacy_consent = fd.get("data_privacy_consent") === "on";
    const terms_accepted = fd.get("terms_accepted") === "on";
    const info_certified = fd.get("info_certified") === "on";

    const supportingDocsFiles = supporting_docs.filter(
      (v): v is File => v instanceof File
    );

    if (
      !org_name ||
      !org_address ||
      !full_name ||
      !position ||
      !email ||
      !contact_number ||
      !award_category ||
      !project_title ||
      !project_description ||
      !dilg_document ||
      !business_permit_document ||
      !dti_sec_document ||
      !key_visual ||
      !bid_document ||
      !project_documentation ||
      !supporting_docs ||
      !data_privacy_consent ||
      !terms_accepted ||
      !info_certified
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (wordCount(company_description || "") > 200) {
      return NextResponse.json(
        { error: "Company description must be 200 words or less." },
        { status: 400 }
      );
    }

    if (wordCount(project_description) > 300) {
      return NextResponse.json(
        { error: "Project description must be 300 words or less." },
        { status: 400 }
      );
    }

    const isValidPdf = (f: File) => f.type === "application/pdf";
    const isValidImageType = (f: File) => ["image/png", "image/jpeg"].includes(f.type);

    if (!isValidImageType(dilg_document) && !isValidPdf(dilg_document)) {
      return NextResponse.json({ error: "DILG document must be PDF/PNG/JPG." }, { status: 400 });
    }
    if (!isValidImageType(business_permit_document) && !isValidPdf(business_permit_document)) {
      return NextResponse.json({ error: "Business permit document must be PDF/PNG/JPG." }, { status: 400 });
    }
    if (!isValidImageType(dti_sec_document) && !isValidPdf(dti_sec_document)) {
      return NextResponse.json({ error: "DTI/SEC document must be PDF/PNG/JPG." }, { status: 400 });
    }
    if (!isValidImageType(key_visual)) {
      return NextResponse.json({ error: "Key visual must be PNG/JPG." }, { status: 400 });
    }
    if (!isValidPdf(bid_document)) {
      return NextResponse.json({ error: "Bid document must be PDF." }, { status: 400 });
    }
    if (!isValidPdf(project_documentation)) {
      return NextResponse.json({ error: "Project documentation must be PDF." }, { status: 400 });
    }

    const folder = `submissions/${crypto.randomUUID()}`;

    async function upload(bucket: string, file: File) {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabaseAdmin.storage.from(bucket).upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

      if (error) throw new Error(error.message);
      return path;
    }

    const dilg_doc_path = await upload("dilg-docs", dilg_document);
    const business_permit_path = await upload("business-permit-docs", business_permit_document);
    const dti_sec_permit_path = await upload("dti-sec-docs", dti_sec_document);
    const key_visual_path = await upload("key-visuals", key_visual);
    const bid_doc_path = await upload("bid-docs", bid_document);
    const project_doc_path = await upload("project-documentations", project_documentation);

    const supporting_doc_paths: string[] = [];
    for (const doc of supportingDocsFiles) {
      const path = await upload("supporting-docs", doc);
      supporting_doc_paths.push(path);
    }

    const { data, error } = await supabaseAdmin
      .from("bid_entries")
      .insert({
        org_name,
        org_address,
        full_name,
        position,
        email,
        contact_number,
        website,
        company_description,
        alt_contact_person,
        alt_contact_number,
        alt_email,
        award_category,
        project_title,
        project_description,
        dilg_doc_path,
        business_permit_path,
        dti_sec_permit_path,
        key_visual_path,
        bid_doc_path,
        project_doc_path,
        supporting_doc_paths,
        video_link,
        data_privacy_consent,
        terms_accepted,
        info_certified,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Submission failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
