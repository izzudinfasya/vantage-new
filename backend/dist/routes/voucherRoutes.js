"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const voucherController_1 = require("../controllers/voucherController");
const router = (0, express_1.Router)();
// Middleware to validate email and name input
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
// Route to handle voucher requests
router.post("/get-voucher", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email tidak valid."),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required."),
], validationMiddleware, voucherController_1.getVoucher);
exports.default = router;
