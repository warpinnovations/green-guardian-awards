import { NextResponse } from "next/server";
import { transporter } from "@/app/lib/nodemailer/transporter";
import { acceptanceEmailTemplate } from "@/app/utils/email-templates/acceptanceTemplate";

export async function POST(req: Request) {
  try {
    const {
      email,
      fullName,
      orgName,
      track,
      awardCategory,
      referenceId,
    } = await req.json();

    const { subject, html } = acceptanceEmailTemplate({
      fullName,
      orgName,
      track,
      awardCategory,
      referenceId,
      submittedAt: new Date().toLocaleDateString(),
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
