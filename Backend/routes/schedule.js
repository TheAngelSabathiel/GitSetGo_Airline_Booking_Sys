const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");
const {
    createSchedule,
    filterSchedulesByStatus,
    getAllSchedules,
    getScheduleDetails,
    searchFlights,
    updateStatus
} = require('../controllers/schedule');

router.post("/", verify, verifyAdmin, createSchedule);

router.post("/filter-by-status", verify, verifyAdmin, filterSchedulesByStatus);

router.get("/", verify, verifyAdmin, getAllSchedules);

router.get("/:scheduleId", getScheduleDetails);

router.post('/search', searchFlights);

router.patch('/:scheduleId/status', verify, verifyAdmin, updateStatus);

module.exports = router;
