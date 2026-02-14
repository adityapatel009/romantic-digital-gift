import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gift from "@/models/Gift";

export async function POST(req: Request) {
  const { giftId, scheduledAt } = await req.json();
  if (!giftId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await connectDB();
  await Gift.updateOne(
    { giftId },
    { $set: { scheduledAt: scheduledAt ? new Date(scheduledAt) : null } }
  );

  return NextResponse.json({ ok: true });
}
