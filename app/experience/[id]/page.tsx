import { supabase } from "@/lib/supabase";
import SuccessPage from "@/app/create/valentine-day/success/page";

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

  return <SuccessPage gift={data} experienceMode />;
}
