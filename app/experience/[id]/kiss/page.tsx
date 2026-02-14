import { supabase } from "@/lib/supabase";
import KissDayPage from "@/app/create/kiss-day/page";

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Gift not found 💔
      </div>
    );
  }

  return <KissDayPage gift={data} experienceMode />;
}
