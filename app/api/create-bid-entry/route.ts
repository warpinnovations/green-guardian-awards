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

    const award_category = String(fd.get("award_category") || "").trim();
    const project_title = String(fd.get("project_title") || "").trim();
    const project_description = String(fd.get("project_description") || "").trim();
    const video_link = String(fd.get("video_link") || "").trim() || null;

    // required files
    const eligibility_doc = fd.get("eligibility_doc") as File | null;
    const key_visual = fd.get("key_visual") as File | null;
    const bid_document = fd.get("bid_document") as File | null;
    const supporting_doc = fd.get("supporting_doc") as File | null;

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
      !eligibility_doc ||
      !key_visual ||
      !bid_document || 
      !supporting_doc
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (wordCount(project_description) > 300) {
      return NextResponse.json(
        { error: "Project description must be 300 words or less." },
        { status: 400 }
      );
    }

    // basic file-type validation
    const okEligibility = ["application/pdf", "image/png", "image/jpeg"].includes(eligibility_doc.type);
    const okKeyVisual = ["image/png", "image/jpeg"].includes(key_visual.type);
    const okPdf = (f: File) => f.type === "application/pdf";

    if (!okEligibility) {
      return NextResponse.json({ error: "Eligibility document must be PDF/PNG/JPG." }, { status: 400 });
    }
    if (!okKeyVisual) {
      return NextResponse.json({ error: "Key visual must be PNG/JPG." }, { status: 400 });
    }
    if (!okPdf(bid_document)) {
      return NextResponse.json({ error: "Bid document must be PDF." }, { status: 400 });
    }
    if (!okPdf(supporting_doc)) {
      return NextResponse.json({ error: "Supporting document must be PDF." }, { status: 400 });
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

    const eligibility_doc_path = await upload("eligibility-docs", eligibility_doc);
    const key_visual_path = await upload("key-visuals", key_visual);
    const bid_document_path = await upload("bid-docs", bid_document);
    const supporting_doc_path = await upload("supporting-docs", supporting_doc);

    const { data, error } = await supabaseAdmin
      .from("bid_entries")
      .insert({
        org_name,
        org_address,
        full_name,
        position,
        email,
        contact_number,
        award_category,
        project_title,
        project_description,
        eligibility_doc_path,
        key_visual_path,
        bid_document_path,
        supporting_doc_path,
        video_link,
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
