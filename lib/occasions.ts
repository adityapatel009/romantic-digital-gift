import { OccasionType } from "@/types/gift";

export const OCCASIONS: {
  type: OccasionType;
  title: string;
  description: string;
}[] = [
  {
    type: "valentine",
    title: "Valentine’s Day",
    description: "A soft, romantic surprise made just for them",
  },
  {
    type: "birthday",
    title: "Birthday",
    description: "A personal moment to make their day special",
  },
  {
    type: "anniversary",
    title: "Anniversary",
    description: "Celebrate your journey together",
  },
  {
    type: "proposal",
    title: "Proposal",
    description: "Ask the most important question beautifully",
  },
  {
    type: "surprise",
    title: "Just Because",
    description: "No reason needed to show love",
  },
];
