const Schedule = require('../models/Schedule');

// @desc    Create a new flight schedule
// @route   POST /api/schedules
exports.createSchedule = async (req, res) => {
    try {
        // Logic check: Ensure arrival and departure airports aren't the same
        if (req.body.departureAirportId === req.body.arrivalAirportId) {
            return res.status(400).json({ 
                success: false, 
                message: "Departure and Arrival airports cannot be the same." 
            });
        }

        const schedule = await Schedule.create(req.body);
        res.status(201).json({ success: true, data: schedule });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all schedules with full Aircraft and Airport details
// @route   GET /api/schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('aircraftId', 'model capacityEconomy capacityBusiness')
            .populate('departureAirportId', 'name iataCode city')
            .populate('arrivalAirportId', 'name iataCode city');

        res.status(200).json({ 
            success: true, 
            count: schedules.length, 
            data: schedules 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get schedules for a specific route (Search)
// @route   GET /api/schedules/search
exports.searchFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        
        // Build a query object
        let query = { status: "Active" };
        if (from) query.departureAirportId = from;
        if (to) query.arrivalAirportId = to;
        
        // If a date is provided, find schedules for that specific day
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);
            query.departureTime = { $gte: start, $lt: end };
        }

        const results = await Schedule.find(query)
            .populate('departureAirportId arrivalAirportId');
            
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update flight status (Delayed, Cancelled, etc.)
// @route   PATCH /api/schedules/:id/status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const schedule = await Schedule.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true, runValidators: true }
        );

        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }
        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};