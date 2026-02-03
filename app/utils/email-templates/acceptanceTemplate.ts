interface AcceptanceEmailProps {
  fullName: string;
  orgName: string;
  track: "LGU" | "MSME";
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
    subject: "Green Guardian Awards – Submission Accepted",
    html: `
      <p>Hi ${fullName},</p>

      <p>
        Thank you for submitting your nomination to the
        <strong>Green Guardian Awards</strong>.
      </p>

      <p>
        We’re pleased to confirm that your submission has been
        <strong>successfully received and accepted</strong> under the
        <strong>${track}</strong> track (<strong>${awardCategory}</strong>).
      </p>

      <ul>
        <li><strong>Organization:</strong> ${orgName}</li>
        <li><strong>Track:</strong> ${track}</li>
        <li><strong>Category:</strong> ${awardCategory}</li>
        <li><strong>Reference ID:</strong> ${referenceId}</li>
        <li><strong>Date Submitted:</strong> ${submittedAt}</li>
      </ul>

      <p>
        Your entry will now proceed to the evaluation phase.
        Should we require any clarification, we’ll contact you via this email.
      </p>

      <p>
        Best regards,<br />
        <strong>Green Guardian Awards Team</strong>
      </p>
    `,
  };
}
