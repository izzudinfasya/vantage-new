import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  email: string;
  name: string;
  consent: boolean;
}

const subscriptionSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true }, // Pastikan email unik
  name: { type: String, required: true },
  consent: { type: Boolean, required: true },
});

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
