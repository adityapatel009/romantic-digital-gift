import { Schema, model, models } from "mongoose";

const GiftSchema = new Schema({
  giftId: { type: String, unique: true },
  unlocked: { type: Boolean, default: false },
  payload: { type: Object }, // names, message, theme, music
  scheduledAt: { type: Date },
}, { timestamps: true });

export default models.Gift || model("Gift", GiftSchema);
