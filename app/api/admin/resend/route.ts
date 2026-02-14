import { NextResponse } from "next/server";
import { deliverGift } from "@/lib/delivery";

export async function POST(req: Request) {
  const { email, phone, link } = await req.json();
  await deliverGift({ email, phone, link });
  return NextResponse.json({ resent: true });
}
