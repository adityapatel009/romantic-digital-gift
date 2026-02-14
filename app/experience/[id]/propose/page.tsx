import { supabase } from "@/lib/supabase";
import ProposeDayPage from "@/app/create/propose-day/page";

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
    <ProposeDayPage
      gift={data}
      experienceMode={true}
    />
  );
}
