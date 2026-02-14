export async function sendWhatsApp(to: string, link: string) {
  // DEV MODE
  console.log("📲 WHATSAPP SENT TO:", to);
  console.log("💖 MESSAGE:", `Someone sent you something special ❤️ ${link}`);

  /*
  PROD (later):
  - Twilio WhatsApp
  - Meta Cloud API
  */
}
