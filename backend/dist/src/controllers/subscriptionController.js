"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscription = void 0;
const Subscription_1 = require("../models/Subscription");
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, consent } = req.body;
    if (!consent) {
        return res
            .status(400)
            .send({ message: "You must agree to receive emails." });
    }
    try {
        const newSubscription = new Subscription_1.Subscription({ email, name, consent });
        yield newSubscription.save();
        return res.status(201).send({ message: "Subscription successful!" });
    }
    catch (error) {
        if (error.code === 11000) {
            return res
                .status(409)
                .send({ message: "This email is already registered." });
        }
        console.error("Error saving subscription:", error);
        return res
            .status(500)
            .send({ message: "An error occurred. Please try again." });
    }
});
exports.createSubscription = createSubscription;
