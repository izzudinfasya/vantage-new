"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
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
    qtyTotal: { type: Number, required: true },
}, { timestamps: true });
exports.Products = (0, mongoose_1.model)("Products", productsSchema);
