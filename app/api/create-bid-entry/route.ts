import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

type CreateBidEntryBody = {
  org_name: string;
  org_address: string;
  classification: string;

  website?: string | null;
  company_description?: string | null;
  facebook_page?: string | null;

  full_name: string;
  position: string;
  email: string;
  contact_number: string;

  alt_contact_person?: string | null;
  alt_contact_number?: string | null;
  alt_email?: string | null;

  award_category: string;
  project_title: string;
  project_description: string;
  video_link?: string | null;

  // storage paths (already uploaded)
  authorization_form_doc_path?: string | null; // LGU only
  business_permit_path?: string | null; // MSME only
  dti_sec_permit_path?: string | null; // MSME only

  key_visual_path: string;
  bid_doc_path: string;
  project_doc_path: string;
  supporting_doc_paths: string[];

  data_privacy_consent: boolean;
  terms_accepted: boolean;
  info_certified: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateBidEntryBody;

    const {
      org_name,
      org_address,
      classification,
      facebook_page,
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
      video_link,

      authorization_form_doc_path,
      business_permit_path,
      dti_sec_permit_path,
      key_visual_path,
      bid_doc_path,
      project_doc_path,
      supporting_doc_paths,

      data_privacy_consent,
      terms_accepted,
      info_certified,
    } = body;

    const isLGU = classification === "Local Government Unit";
    const isMSME = classification === "Business";

    if (
      !org_name ||
      !org_address ||
      !classification ||
      !full_name ||
      !position ||
      !email ||
      !contact_number ||
      !award_category ||
      !project_title ||
      !project_description ||
      !key_visual_path ||
      !bid_doc_path ||
      !project_doc_path ||
      data_privacy_consent !== true ||
      terms_accepted !== true ||
      info_certified !== true
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (isLGU && !authorization_form_doc_path) {
      return NextResponse.json(
        { error: "Authorization form is required for LGU submissions." },
        { status: 400 },
      );
    }

    if (isMSME && (!business_permit_path || !dti_sec_permit_path)) {
      return NextResponse.json(
        { error: "Business permit and DTI/SEC permit are required for MSME submissions." },
        { status: 400 },
      );
    }

    if (company_description && wordCount(company_description) > 200) {
      return NextResponse.json(
        { error: "Company description must be 200 words or less." },
        { status: 400 },
      );
    }

    if (wordCount(project_description) > 300) {
      return NextResponse.json(
        { error: "Project description must be 300 words or less." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("bid_entries")
      .insert({
        org_name,
        org_address,
        classification,
        facebook_page: facebook_page || null,
        full_name,
        position,
        email,
        contact_number,
        website: website || null,
        company_description: company_description || null,
        alt_contact_person: alt_contact_person || null,
        alt_contact_number: alt_contact_number || null,
        alt_email: alt_email || null,
        award_category,
        project_title,
        project_description,
        video_link: video_link || null,

        authorization_form_doc_path: isLGU ? authorization_form_doc_path : null,
        business_permit_path: isMSME ? business_permit_path : null,
        dti_sec_permit_path: isMSME ? dti_sec_permit_path : null,

        key_visual_path,
        bid_doc_path,
        project_doc_path,
        supporting_doc_paths,

        data_privacy_consent,
        terms_accepted,
        info_certified,
      })
      .select(
        "id, email, full_name, org_name, award_category, reference_id, created_at",
      )
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        org_name: data.org_name,
        award_category: data.award_category,
        reference_id: data.reference_id,
        created_at: data.created_at,
      },
      { status: 201 },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Submission failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
