const express = require('express');
const router = express.Router();

// Import the FlightSeat controller
const {
    initializeSeats,
    getSeatsBySchedule,
    updateSeatFareClass
} = require('../controllers/flightSeatController');

// @route   POST /api/flight-seats/initialize/:scheduleId
// Generates the initial layout (e.g., 1A, 1B, 1C...) for a specific flight
router.post('/initialize/:scheduleId', initializeSeats);

// @route   GET /api/flight-seats/:scheduleId
// Fetches the seat map so the user can pick their seat
router.get('/:scheduleId', getSeatsBySchedule);

// @route   PATCH /api/flight-seats/:seatId
// Updates seat details like changing its Fare Class
router.patch('/:seatId', updateSeatFareClass);

module.exports = router;