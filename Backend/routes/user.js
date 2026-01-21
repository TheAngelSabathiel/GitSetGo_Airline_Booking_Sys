const express = require("express");
const userController = require("../controllers/user");
const { verify, verifyAdmin } = require("../auth");
const passport = require('passport');
const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.patch("/update-info", verify, userController.updateUserInfo);

router.get("/get-profile", verify, userController.getProfile);

router.patch("/update-password", verify, userController.updatePassword);

router.patch("/set-as-admin", verify, verifyAdmin, userController.setAsAdmin);

router.patch("/update-payment-info", verify, userController.updatePaymentInfo);

router.patch("/verify", verify, userController.verifyUser);

module.exports = router;
