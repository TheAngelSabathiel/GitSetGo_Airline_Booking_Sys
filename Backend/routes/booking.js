const express = require("express");

const bookingController = require("../controllers/booking");
const { verifyOptional, verify, verifyAdmin} = require("../auth");

const router = express.Router();


router.post("/",verifyOptional, bookingController.createBooking);

router.patch("/check-in",verifyOptional, bookingController.passengerCheckIn);

router.get("/bookingDetails", verifyOptional, bookingController.getBookingDetails);

router.get("/bookings-by-flight", verify, verifyAdmin, bookingController.getAllBooksByFlight);

router.get("/history", verify, bookingController.getFlightHistory);

router.get("/upcomming", verify, bookingController.getUpcommingFlight);

router.patch("/:bookingId/update-info", verify, bookingController.updateBooking);

router.patch('/:bookingReference/payment', bookingController.updatePaymentStatus);

module.exports = router;