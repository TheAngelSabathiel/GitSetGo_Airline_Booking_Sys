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

router.post('/search', searchFlights);

router.patch('/:scheduleId/status', verify, verifyAdmin, updateStatus);

module.exports = router;
