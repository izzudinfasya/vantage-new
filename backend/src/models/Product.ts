import { Schema, model, Document } from "mongoose";

// Define the interface for size objects
interface ISize {
  name: string;
  qty: number;
}

export interface IProducts extends Document {
  _id: string;
  title: string;
  badgeType: string;
  originalPrice: number;
  discountedPrice: number;
  images: string[];
  sizeChart: string[];
  details: string[];
  sizes: ISize[];
  sizeModel: string[];
  heightModel: number[];
  washingInstructions: string[];
  returnPolicies: string[];
  shippingPolicies: string[];
  linkProduct: string;
  qtyTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const productsSchema = new Schema<IProducts>(
  {
    title: { type: String, required: true },
    badgeType: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    linkProduct: { type: String, required: true },
    images: { type: [String], required: true },
    sizeChart: { type: [String], required: true },
    details: { type: [String], required: true },
    sizes: {
      type: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
        },
      ],
      required: true,
    },
    sizeModel: { type: [String], required: true },
    heightModel: { type: [Number], required: true },
    washingInstructions: { type: [String], required: true },
    returnPolicies: { type: [String], required: true },
    shippingPolicies: { type: [String], required: true },
    qtyTotal: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Products = model<IProducts>("Products", productsSchema);
