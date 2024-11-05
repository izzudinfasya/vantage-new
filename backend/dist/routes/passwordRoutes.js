"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passwordController_1 = require("../controllers/passwordController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/get-password", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email address"),
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required"),
], passwordController_1.getPassword);
router.post("/validate", passwordController_1.validatePassword);
router.get("/get-waiting-list", passwordController_1.waitingList);
router.delete("/:id", passwordController_1.deleteWaitingList);
exports.default = router;
