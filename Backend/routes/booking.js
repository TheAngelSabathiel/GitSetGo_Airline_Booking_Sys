const express = require("express");

const bookingController = require("../controllers/booking");
const { verifyOptional, verify, verifyAdmin} = require("../auth");

const router = express.Router();


router.post("/",verifyOptional, bookingController.createBooking);

router.patch("/check-in",verifyOptional, bookingController.passengerCheckIn);

router.patch("/:bookingId/update-info", verify, bookingController.updateBooking);

router.get("/bookingDetails", verifyOptional, bookingController.getBookingDetails);

module.exports = router;