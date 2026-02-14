import { supabase } from "@/lib/supabase";
import ValentineDayPage from "@/app/create/valentine-day/page";

export default async function Page({ params }: any) {
  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) return <div>Gift not found</div>;

  return (
    <ValentineDayPage
      gift={data}
      experienceMode={true}
    />
  );
}
