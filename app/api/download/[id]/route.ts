import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Gift not found" }, { status: 404 });
  }

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setFontSize(24);
  pdf.text(
    `${data.sender_name} ❤️ ${data.receiver_name}`,
    105,
    30,
    { align: "center" }
  );

  pdf.setFontSize(14);
  pdf.text(data.message || "", 20, 50, { maxWidth: 170 });

  let y = 70;

  if (Array.isArray(data.photos)) {
    for (const photo of data.photos) {
      try {
        if (photo?.preview) {
          pdf.addImage(photo.preview, "JPEG", 20, y, 170, 90);
          y += 100;
        }
      } catch {}
    }
  }

  const pdfBuffer = pdf.output("arraybuffer");

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=love-story.pdf",
    },
  });
}
