const promoController = require("../controllers/promo");
const { verify, verifyAdmin } = require("../auth");
const express = require("express");
const router = express.Router();

router.post("/", verify, verifyAdmin, promoController.createPromo);

router.get("/", verify, verifyAdmin, promoController.getAllPromos);

router.get("/:promoId", verify, verifyAdmin, promoController.getPromoDetails);

router.post("/redeem", promoController.verifyPromo);

module.exports = router;