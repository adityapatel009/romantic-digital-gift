import { supabase } from "@/lib/supabase";
import TeddyDayPage from "@/app/create/teddy-day/page";

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

  return (
    <TeddyDayPage
      gift={data}
      experienceMode={true}
    />
  );
}
