"use client";

import { useGiftStore } from "@/lib/gift-store";
import ProgressBar from "@/components/create/ProgressBar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import BannerUpload3D from "@/components/ui/BannerUpload3D";

export default function NamesPage() {
  const router = useRouter();
  const { gift, updateGift } = useGiftStore();

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleBannerUpload = (file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
updateGift({ bannerImage: previewUrl });
setBannerPreview(previewUrl);

  };

  return (
    <main className="min-h-screen bg-[#fff5f7] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="
          w-full max-w-3xl
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-400">Step 2 of 6</span>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <ProgressBar step={2} />
        </div>

        {/* Content */}
        <div className="px-10 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            The Basics
          </h1>

          {/* Partner Name */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            My Partner&apos;s Name <span className="text-red-500">(No emojis)</span>
          </label>
          <input
            value={gift.receiverName || ""}
            onChange={(e) =>
              updateGift({ receiverName: e.target.value })
            }
            placeholder="e.g. Juliet"
            className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Sender Name */}
          <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
            My Name (Sender)
          </label>
          <input
            value={gift.senderName || ""}
            onChange={(e) =>
              updateGift({ senderName: e.target.value })
            }
            placeholder="e.g. Romeo"
            className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                My Email <span className="text-red-500">*</span>
              </label>
              <input
                value={gift.email || ""}
                onChange={(e) =>
                  updateGift({ email: e.target.value })
                }
                placeholder="To receive gift link"
                className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                My Phone Number
              </label>
              <input
                value={gift.phone || ""}
                onChange={(e) =>
                  updateGift({ phone: e.target.value })
                }
                placeholder="For updates"
                className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          </div>

          {/* Warning */}
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            ⚠️ Important: Please ensure this is correct.  
            Your gift website link will be sent here.
          </div>

          {/* Special Date */}
          <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
            The Special Date (Password)
          </label>
          <input
            value={gift.specialDate || ""}
            onChange={(e) =>
              updateGift({ specialDate: e.target.value })
            }
            placeholder="DDMMYYYY (e.g. 14022024)"
            className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Strict format: <strong>14022024</strong> (NOT 14/02/2024)
          </p>

          {/* Banner Upload */}
          <div className="mt-10">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Banner Image
            </label>

            <BannerUpload3D
              preview={bannerPreview}
              onUpload={handleBannerUpload}
            />

            {bannerPreview && (
              <p className="mt-3 text-sm text-green-600">
                ✅ Banner image uploaded successfully
              </p>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-6 border-t flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create/message")}
            className="
              px-10 py-4 rounded-full text-white text-lg
              bg-gradient-to-r from-pink-500 to-purple-500
              shadow-lg
            "
          >
            Next →
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
