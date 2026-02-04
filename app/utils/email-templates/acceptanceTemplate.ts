interface AcceptanceEmailProps {
  fullName: string;
  orgName: string;
  track: "Local Government Unit" | "Business";
  awardCategory: string;
  referenceId: string;
  submittedAt: string;
}

export function acceptanceEmailTemplate({
  fullName,
  orgName,
  track,
  awardCategory,
  referenceId,
  submittedAt,
}: AcceptanceEmailProps) {
  return {
    subject: "Green Guardian Awards – Submission Successfully Received",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.6;">
        <p>Dear <strong>${fullName}</strong>,</p>

        <p>
          Thank you for submitting your nomination to the
          <strong>Green Guardian Awards</strong>.
          We are pleased to inform you that your entry has been
          <strong>successfully received and officially accepted</strong>.
        </p>

        <p>
          Your submission has been recorded under the
          <strong>${track}</strong> track for the
          <strong>${awardCategory}</strong> category.
        </p>

        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin: 12px 0;">
          <tr>
            <td><strong>Organization</strong></td>
            <td>: ${orgName}</td>
          </tr>
          <tr>
            <td><strong>Track</strong></td>
            <td>: ${track}</td>
          </tr>
          <tr>
            <td><strong>Award Category</strong></td>
            <td>: ${awardCategory}</td>
          </tr>
          <tr>
            <td><strong>Reference ID</strong></td>
            <td>: ${referenceId}</td>
          </tr>
          <tr>
            <td><strong>Date Submitted</strong></td>
            <td>: ${submittedAt}</td>
          </tr>
        </table>

        <p>
          Your entry will proceed to the evaluation and review phase.
          Our team may reach out should additional information or clarification be required.
          Please keep this email for your records and reference.
        </p>

        <p>
          We sincerely appreciate your participation and commitment to environmental
          sustainability and good governance.
        </p>

        <p>
          Kind regards,<br />
          <strong>Green Guardian Awards Team</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation email. Please do not reply directly to this message.
        </p>
      </div>
    `,
  };
}
