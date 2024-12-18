import mongoose, { Schema, Document } from "mongoose";

export interface IVoucher extends Document {
  email: string;
  name: string;
  code: string;
  consent: boolean;
  used: boolean;
}

const voucherSchema: Schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  consent: { type: Boolean, required: true },
  used: { type: Boolean, default: false },
});

export const Voucher = mongoose.model<IVoucher>("Voucher", voucherSchema);
