import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  giftId: String,
  status: { type: String, default: "paid" },
}, { timestamps: true });

export default models.Order || model("Order", OrderSchema);
