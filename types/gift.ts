export type OccasionType =
  | "valentine"
  | "birthday"
  | "anniversary"
  | "proposal"
  | "surprise";

export interface GiftDraft {
  id: string;
  occasion: OccasionType;

  senderName: string;
  receiverName: string;

  email?: string;
  phone?: string;
  specialDate?: string;

  /* ✅ FIXED */
  bannerImage?: string | null;

  photos?: {
    id: string;
    preview: string;
    scale: number;
    x: number;
    y: number;
    story?: string;
  }[];

  /* ✅ FIXED */
  music?: {
    url: string;
    name: string;
  };

  message?: string;
  musicId?: string;
  visualTheme?: string;
  scheduledAt?: Date;
}
