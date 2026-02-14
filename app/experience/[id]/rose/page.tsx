import { supabase } from "@/lib/supabase";
import RoseDayPage from "@/app/create/rose-day/page";

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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Love story not found 💔
      </div>
    );
  }

  return <RoseDayPage gift={data} experienceMode />;
}
