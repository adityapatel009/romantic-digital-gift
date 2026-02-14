import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Gift from "@/models/Gift";

export async function GET() {
  await connectDB();
  
await Order.create({
  giftId: "demo123",
  amount: 199,
  scheduledAt: null,
  unlocked: true,
});

  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const gifts = await Gift.find().lean();

  const map = Object.fromEntries(gifts.map(g => [g.giftId, g]));

  const data = orders.map(o => ({
    orderId: o.orderId,
    giftId: o.giftId,
    amount: o.amount,
    createdAt: o.createdAt,
    scheduledAt: map[o.giftId]?.scheduledAt,
    unlocked: map[o.giftId]?.unlocked,
  }));

  return NextResponse.json(data);
}
