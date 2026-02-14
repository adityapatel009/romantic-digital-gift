import { supabase } from "@/lib/supabase";
import SuccessPage from "@/app/create/valentine-day/success/page";

export default async function Page({ params }: any) {
  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) return <div>Gift not found</div>;

  return (
    <SuccessPage
      gift={data}
      experienceMode={true}
    />
  );
}
