import { NextResponse } from "next/server";
import { transporter } from "@/app/lib/nodemailer/transporter";
import { acceptanceEmailTemplate } from "@/app/utils/email-templates/acceptanceTemplate";

export async function POST(req: Request) {
  const {
    email,
    fullName,
    orgName,
    track,
    awardCategory,
    referenceId,
  } = await req.json();

  // Acceptance email sending disabled
  // const { subject, html } = acceptanceEmailTemplate({
  //   fullName,
  //   orgName,
  //   track,
  //   awardCategory,
  //   referenceId,
  //   submittedAt: new Date().toLocaleDateString(),
  // });
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: email,
  //   subject,
  //   html,
  // });

  // Always return success, no email sent
  return NextResponse.json({ success: true });
}
