const express = require('express');
const router = express.Router();

// Import the Booking controller
const {
    createBooking,
    getBookingByReference,
    updatePaymentStatus
} = require('../controllers/bookingController');

// Main Booking Routes
router
    .route('/')
    .post(createBooking); // POST: Start a new booking

// Find a booking by its 6-character Reference (e.g., /api/bookings/manage/A1B2C3)
router
    .route('/manage/:reference')
    .get(getBookingByReference);

// Update payment status (usually called by a payment service like Stripe or an admin)
router
    .route('/:id/payment')
    .patch(updatePaymentStatus);

module.exports = router;