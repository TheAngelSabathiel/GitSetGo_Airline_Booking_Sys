const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");
const {
    createSchedule,
    getAllSchedules,
    searchFlights,
    updateStatus
} = require('../controllers/scheduleController');

router.post("/", verify, verifyAdmin, createSchedule);

// Route for searching flights (Best for the customer-facing search bar)
// Example: /api/schedules/search?from=ID&to=ID&date=2024-05-20
router.get('/search', searchFlights);

// Standard Routes
router
    .route('/')
    .get(getAllSchedules) // Get all flights (for admin view)

// Update flight status (Active, Delayed, Cancelled, Finished)
router.patch('/:id/status', updateStatus);

module.exports = router;
