import { supabase } from "@/lib/supabase";
import ProposePage from "@/app/create/valentine-day/propose/page";

export default async function Page({ params }: any) {
  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) return <div>Gift not found</div>;

  return (
    <ProposePage
      gift={data}
      experienceMode={true}
    />
  );
}
