const FlightSeat = require('../models/FlightSeat');
const Schedule = require('../models/Schedule');

// @desc    Initialize seat map for a schedule
// @route   POST /api/flight-seats/initialize/:scheduleId
exports.initializeSeats = async (req, res) => {
    try {
        // 1. Get the schedule and populate aircraft details to know capacity
        const schedule = await Schedule.findById(req.params.scheduleId).populate('aircraftId');
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        const aircraft = schedule.aircraftId;
        const seatsToCreate = [];

        // 2. Logic to generate seat numbers (Example: 1A, 1B... 30F)
        // This is a simplified version; you can customize based on aircraft layout
        const rows = Math.ceil((aircraft.capacityEconomy + aircraft.capacityBusiness) / 6);
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

        let seatCount = 0;
        for (let r = 1; r <= rows; r++) {
            for (let l of letters) {
                if (seatCount < (aircraft.capacityEconomy + aircraft.capacityBusiness)) {
                    seatsToCreate.push({
                        scheduleId: schedule._id,
                        seatNumber: `${r}${l}`,
                        // You can assign fareClassId logic here if needed
                    });
                    seatCount++;
                }
            }
        }

        // 3. Bulk insert for performance
        const seats = await FlightSeat.insertMany(seatsToCreate);
        res.status(201).json({ success: true, count: seats.length, data: seats });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all seats for a specific flight
// @route   GET /api/flight-seats/:scheduleId
exports.getSeatsBySchedule = async (req, res) => {
    try {
        const seats = await FlightSeat.find({ scheduleId: req.params.scheduleId })
            .populate('fareClassId');
        
        res.status(200).json({ success: true, count: seats.length, data: seats });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update seat class (e.g., assigning a specific seat to Business Class)
// @route   PATCH /api/flight-seats/:seatId
exports.updateSeatFareClass = async (req, res) => {
    try {
        const seat = await FlightSeat.findByIdAndUpdate(
            req.params.seatId,
            { fareClassId: req.body.fareClassId },
            { new: true }
        );
        res.status(200).json({ success: true, data: seat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};