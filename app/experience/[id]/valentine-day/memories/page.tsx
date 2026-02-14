import { supabase } from "@/lib/supabase";
import MemoriesPage from "@/app/create/valentine-day/memories/page";

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
        Gift not found 💔
      </div>
    );
  }

  return <MemoriesPage gift={data} experienceMode />;
}
