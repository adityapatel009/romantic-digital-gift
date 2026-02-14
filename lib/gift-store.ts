import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GiftDraft } from "@/types/gift";

/* ================= FILE TO BASE64 ================= */

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

interface GiftState {
  gift: GiftDraft;
  hydrated: boolean;
  updateGift: (data: Partial<any>) => Promise<void>;
  resetGift: () => void;
  setHydrated: (state: boolean) => void;
}

const initialGift: GiftDraft = {
  id: "",
  occasion: "valentine",
  senderName: "",
  receiverName: "",
  email: "",
  phone: "",
  specialDate: "",

  photos: [],
};

export const useGiftStore = create<GiftState>()(
  persist(
    (set) => ({
      gift: initialGift,
      hydrated: false,

      setHydrated: (state) => set({ hydrated: state }),

      updateGift: async (data) => {
        const updatedData: any = { ...data };

        if (data.bannerImage instanceof File) {
          updatedData.bannerImage = await fileToBase64(data.bannerImage);
        }

        if (data.photos && Array.isArray(data.photos)) {
          updatedData.photos = await Promise.all(
            data.photos.map(async (photo: any) => {
              if (photo.file instanceof File) {
                const base64 = await fileToBase64(photo.file);
                return {
                  ...photo,
                  preview: base64,
                  file: undefined,
                };
              }
              return photo;
            })
          );
        }

        set((state) => ({
          gift: {
            ...state.gift,
            ...updatedData,
          },
        }));
      },

      resetGift: () => set({ gift: initialGift }),
    }),
    {
      name: "valentine-gift-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
