"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [gifts, setGifts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
        return;
      }

      setUser(data.user);

      const { data: giftsData } = await supabase
        .from("gifts")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      setGifts(giftsData || []);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-12">
          Your Love Stories 💖
        </h1>

        {gifts.length === 0 && (
          <p className="text-gray-400">
            You haven’t created any gifts yet.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {gift.sender_name} → {gift.receiver_name}
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                {new Date(gift.created_at).toLocaleDateString()}
              </p>

              <Link
                href={`/experience/${gift.id}/rose`}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-sm"
              >
                View Experience
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/create/occasion"
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          >
            + Create New Gift
          </Link>
        </div>
      </div>
    </main>
  );
}
