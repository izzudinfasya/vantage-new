import mongoose, { Document, Schema } from "mongoose";

export interface IPassword extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
}

const PasswordSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const PasswordModel = mongoose.model<IPassword>("Password", PasswordSchema);

export default PasswordModel;
