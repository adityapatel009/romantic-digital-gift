import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "A Special Valentine Gift ❤️",
    description: "A beautiful love story made just for you.",
  };
}

export default async function Page({ params }: any) {
  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Gift not found
      </div>
    );
  }

  // 🔥 Direct redirect to Experience flow
  redirect(`/experience/${data.id}/rose`);
}
