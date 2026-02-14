"use client";

import { useGiftStore } from "@/lib/gift-store";
import ProgressBar from "@/components/create/ProgressBar";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";



/* 💗 Floating Hearts */
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: [0, 0.4, 0], y: -500 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: i * 2,
          }}
          className="absolute left-1/2 text-pink-300 text-lg"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

export default function PhotosPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { gift, updateGift } = useGiftStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const photos = gift.photos || [];

  /* Upload */
  const handleUpload = (files: FileList | null) => {
    if (!files) return;

   const newPhotos = Array.from(files).map((f) => ({
  id: nanoid(),
  file: f, // 👈 IMPORTANT
  scale: 1,
  x: 0,
  y: 0,
}));


    updateGift({ photos: [...photos, ...newPhotos] });
  };
useEffect(() => {
  const test = async () => {
    const { data, error } = await supabase.from("gifts").select("*");
    console.log("Supabase test:", data, error);
  };

  test();
}, []);
  /* Remove */
  const removePhoto = (id: string) => {
    updateGift({
      photos: photos.filter((p) => p.id !== id),
    });
  };

  /* Update photo */
  const updatePhoto = (id: string, data: any) => {
    updateGift({
      photos: photos.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    });
  };

  const editing = photos.find((p) => p.id === editingId);

  return (
    <main className="relative min-h-screen bg-[#fff5f7] px-4 py-14 overflow-hidden">
      <FloatingHearts />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top */}
        <div className="flex justify-between px-6 py-4 border-b">
          <button onClick={() => router.back()} className="text-sm text-gray-500">
            ← Back
          </button>
          <span className="text-sm text-gray-400">Step 4 of 6</span>
        </div>

        <div className="px-6 pt-4">
          <ProgressBar step={4} />
        </div>

        {/* Content */}
        <div className="px-8 py-10">
          <h1 className="text-2xl font-semibold mb-6">
            Upload Your Memories
          </h1>

          {/* Upload */}
          <div
            onClick={() => fileRef.current?.click()}
            className="
              cursor-pointer border-2 border-dashed border-pink-300
              rounded-2xl p-10 text-center
              bg-pink-50 hover:bg-pink-100 transition
            "
          >
            Click to upload photos
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleUpload(e.target.files)}
          />

          {/* Grid */}
          {photos.length > 0 && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((img) => (
                <motion.div
                  key={img.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl bg-white"
                >
                  {/* Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={img.preview}
                      className="w-full h-full object-cover"
                      style={{
                        transform: `scale(${img.scale}) translate(${img.x}px, ${img.y}px)`,
                      }}
                    />
                  </div>

                  {/* ❌ Remove */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePhoto(img.id)}
                    className="
                      absolute top-2 right-2
                      w-8 h-8 rounded-full
                      bg-white/90 text-red-500
                      shadow-lg backdrop-blur
                    "
                  >
                    ✕
                  </motion.button>

                  {/* ✏️ Edit */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setEditingId(img.id)}
                    className="
                      absolute bottom-0 inset-x-0
                      py-2 text-xs text-white
                      bg-black/50 backdrop-blur
                    "
                  >
                    ✏️ Adjust Photo
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 py-6 border-t flex justify-end">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
     onClick={async () => {
  try {
    // 🔐 Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first 💖");
      return;
    }

    const { data, error } = await supabase
      .from("gifts")
      .insert([
        {
          sender_name: gift.senderName,
          receiver_name: gift.receiverName,
          message: gift.message,
          photos: gift.photos,
          user_id: user.id, // 🔥 IMPORTANT
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      alert("Something went wrong. Please try again.");
      return;
    }

    // Redirect to experience
    router.push(`/experience/${data.id}/rose`);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error occurred.");
  }
}}


            className="
              px-12 py-4 rounded-full
              text-white text-lg
              bg-gradient-to-r from-pink-500 to-purple-500
              shadow-lg
            "
          >
            Continue →
          </motion.button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[320px]">
            <h3 className="font-semibold mb-4">Adjust Photo</h3>

            <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
              <img
                src={editing.preview}
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${editing.scale}) translate(${editing.x}px, ${editing.y}px)`,
                }}
              />
            </div>

            <label className="text-xs">Zoom</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={editing.scale}
              onChange={(e) =>
                updatePhoto(editing.id, { scale: +e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <button onClick={() => updatePhoto(editing.id, { x: editing.x - 10 })}>◀</button>
              <button onClick={() => updatePhoto(editing.id, { x: editing.x + 10 })}>▶</button>
              <button onClick={() => updatePhoto(editing.id, { y: editing.y - 10 })}>▲</button>
              <button onClick={() => updatePhoto(editing.id, { y: editing.y + 10 })}>▼</button>
            </div>

            <button
              onClick={() => setEditingId(null)}
              className="mt-6 w-full py-2 rounded-full bg-pink-500 text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
