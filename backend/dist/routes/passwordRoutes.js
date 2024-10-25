"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passwordController_1 = require("../controllers/passwordController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/get-password", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email address"),
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("phoneNumber").not().isEmpty().withMessage("Phone number is required"),
], passwordController_1.getPassword);
router.post("/validate", passwordController_1.validatePassword);
exports.default = router;
