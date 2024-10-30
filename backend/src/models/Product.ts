import { Schema, model, Document } from "mongoose";

export interface IProducts extends Document {
  title: string;
  badgeType: string;
  originalPrice: number;
  discountedPrice: number;
  images: string[];
  sizeChart: string[];
  details: string[];
  sizes: string[];
  sizeModel: string[];
  heightModel: number[];
  washingInstructions: string[];
  returnPolicies: string[];
  shippingPolicies: string[];
  linkProduct: string[];
}

const productsSchema = new Schema<IProducts>(
  {
    title: { type: String, required: true },
    badgeType: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    images: { type: [String], required: true },
    sizeChart: { type: [String], required: true },
    details: { type: [String], required: true },
    sizes: { type: [String], required: true },
    sizeModel: { type: [String], required: true },
    heightModel: { type: [Number], required: true },
    washingInstructions: { type: [String], required: true },
    returnPolicies: { type: [String], required: true },
    shippingPolicies: { type: [String], required: true },
    linkProduct: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Products = model<IProducts>("Products", productsSchema);