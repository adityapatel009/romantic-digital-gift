import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ giftId: string }> }
) {
  const { giftId } = await context.params;

  // your logic using giftId

  return NextResponse.json({ success: true });
}
