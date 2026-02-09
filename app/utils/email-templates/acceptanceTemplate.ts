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
  const year = new Date().getFullYear();

  return {
    subject: "Green Guardian Awards – Submission Confirmed",
    html: `
<div style="margin:0; padding:0; background:#f6f7f8;">
  <!-- Preheader -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    Your nomination has been received. Reference ID: ${referenceId}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; background:#f6f7f8;">
    <tr>
      <td align="center" style="padding:24px 16px;">

        <!-- CARD CONTAINER (wider, rounded corners back) -->
        <table width="860" cellpadding="0" cellspacing="0" role="presentation"
          style="border-collapse:separate; border-spacing:0; width:100%; max-width:860px; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #eaeaea;">

          <!-- HEADER (inside card, correct spacing) -->
          <tr>
            <td style="background:#0A2724; border-bottom:8px solid #D4AF37; padding:18px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                <tr>
                  <!-- Left: DG -->
                  <td align="left" valign="middle" style="width:50%;">
                    <img
                      src="https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/public/email-assets/dg-long-logo.png"
                      alt="Daily Guardian"
                      width="190"
                      style="display:block; height:auto; border:0; outline:none; text-decoration:none;"
                    />
                  </td>

                  <!-- Right: GGA -->
                  <td align="right" valign="middle" style="width:50%;">
                    <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                      <tr>
                        <td valign="middle" style="padding-right:10px;">
                          <img
                            src="https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/public/email-assets/gga-logo.png"
                            alt="Green Guardian Awards"
                            height="34"
                            style="display:block; height:34px; width:auto; border:0; outline:none; text-decoration:none;"
                          />
                        </td>
                        <td valign="middle" style="white-space:nowrap;">
                          <span style="font-family: Georgia, serif; font-size:20px; font-weight:700; color:#eefaf5;">
                            Green Guardian Awards
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>

                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:26px 28px; font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6;">

              <p style="margin:0 0 14px;">Dear <strong>${fullName}</strong>,</p>

              <p style="margin:0 0 14px;">
                Thank you for submitting your nomination to the <strong>Green Guardian Awards</strong>.
                We are pleased to inform you that your entry has been
                <strong>successfully received and officially accepted</strong>.
              </p>

              <p style="margin:0 0 18px;">
                Your submission has been recorded under the <strong>${track}</strong> track for the
                <strong>${awardCategory}</strong> category.
              </p>

              <!-- DETAILS CARD -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="border-collapse:separate; border-spacing:0; background:#f8fafb; border:1px solid #e6eaee; border-radius:12px; margin:16px 0 22px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:7px 0; width:180px; color:#333;"><strong>Organization</strong></td>
                        <td style="padding:7px 0; color:#111;">${orgName}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; color:#333;"><strong>Track</strong></td>
                        <td style="padding:7px 0; color:#111;">${track}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; color:#333;"><strong>Award Category</strong></td>
                        <td style="padding:7px 0; color:#111;">${awardCategory}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; color:#333;"><strong>Reference ID</strong></td>
                        <td style="padding:7px 0; color:#111;"><strong>${referenceId}</strong></td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; color:#333;"><strong>Date Submitted</strong></td>
                        <td style="padding:7px 0; color:#111;">${submittedAt}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 10px;"><strong>What happens next</strong></p>
              <ul style="padding-left:18px; margin:0 0 18px;">
                <li style="margin:0 0 6px;">Your entry proceeds to the evaluation and review phase.</li>
                <li style="margin:0 0 6px;">We may contact you if additional information is needed.</li>
                <li style="margin:0;">Please keep your <strong>Reference ID</strong> for tracking and inquiries.</li>
              </ul>

              <p style="margin:0 0 18px;">
                Sincerely,<br />
                <strong>Daily Guardian</strong>
              </p>

              <hr style="border:none; border-top:1px solid #e6e6e6; margin:18px 0;" />

              <p style="font-size:12px; color:#666; margin:0;">
                This inbox is not monitored and replies to this email will not be received.
                Please send a <strong>new email</strong> to
                <a href="mailto:dailyguardianmarketing@gmail.com" style="color:#0A2724; text-decoration:none;">
                  dailyguardianmarketing@gmail.com
                </a>.
              </p>

            </td>
          </tr>

          <!-- FOOTER (inside card, rounded bottom stays) -->
          <tr>
            <td style="background:#0c2725; color:#ffffff; text-align:center; padding:16px 18px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0 0 8px; font-size:12px; color:rgba(255,255,255,0.85);">
                &copy; ${year} Green Guardian Awards. All rights reserved.
              </p>
              <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.85); line-height:1.5;">
                Powered by <strong style="color:#ffffff;">Prometheus WARP</strong>.<br />
                Organized and administered by <span style="color:#f3d107;">Daily Guardian</span>.
              </p>
            </td>
          </tr>

        </table>
        <!-- END CARD -->

      </td>
    </tr>
  </table>
</div>
    `,
  };
}
