import { sendEmail } from "./mail";
import { sendWhatsApp } from "./whatsapp";

export async function deliverGift({
  email,
  phone,
  link,
}: {
  email?: string;
  phone?: string;
  link: string;
}) {
  if (email) {
    await sendEmail(email, link);
  }
  if (phone) {
    await sendWhatsApp(phone, link);
  }
}
