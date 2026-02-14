import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Gift from "@/models/Gift";

export async function POST(req: Request) {
  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(sign)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await connectDB();

  const giftId = `gift_${Date.now()}`;

  await Gift.create({
    giftId,
    unlocked: true,
    payload: {}, // later: pull from store
  });

  await Order.create({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    amount: 199,
    giftId,
  });

  return NextResponse.json({ success: true, giftId });
}
