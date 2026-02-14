export async function sendEmail(to: string, link: string) {
  // DEV MODE
  console.log("📧 EMAIL SENT TO:", to);
  console.log("🔗 LINK:", link);

  /*
  PROD (later):
  - Nodemailer / Resend / SendGrid
  - HTML template
  */
}
