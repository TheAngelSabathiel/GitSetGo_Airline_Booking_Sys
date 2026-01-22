const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");
const {
    createSchedule,
    filterSchedulesByStatus,
    getAllSchedules,
    searchFlights,
    updateStatus
} = require('../controllers/scheduleController');

router.post("/", verify, verifyAdmin, createSchedule);

router.post("/filter-by-status", verify, filterSchedulesByStatus);

router.get("/", verify, verifyAdmin, getAllSchedules);

// Route for searching flights (Best for the customer-facing search bar)
// Example: /api/schedules/search?from=ID&to=ID&date=2024-05-20
router.get('/search', searchFlights);

// Update flight status (Active, Delayed, Cancelled, Finished)
router.patch('/:id/status', verify, verifyAdmin, updateStatus);

module.exports = router;
