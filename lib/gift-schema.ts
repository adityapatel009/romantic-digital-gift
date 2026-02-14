import { GiftDraft } from "@/types/gift";

export function createEmptyGift(): GiftDraft {
  return {
    id: crypto.randomUUID(),
    occasion: "valentine",
    senderName: "",
    receiverName: "",
  };
}
