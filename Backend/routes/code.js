const express = require("express");
const codeController = require("../controllers/code");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/send-code", codeController.sendCode);

router.post("/verify-code", codeController.verifyCode);

module.exports = router;
