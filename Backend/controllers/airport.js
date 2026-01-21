const Airport = require('../models/Airport');

// @desc    Add a new airport
// @route   POST /api/airports
exports.addAirport = async (req, res) => {
    try {
        // Check if airport with same IATA code already exists
        const existingAirport = await Airport.findOne({ iataCode: req.body.iataCode.toUpperCase() });
        if (existingAirport) {
            return res.status(400).json({ success: false, message: "Airport with this IATA code already exists" });
        }

        const airport = await Airport.create(req.body);
        res.status(201).json({ success: true, data: airport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all active airports
// @route   GET /api/airports
exports.getAllAirports = async (req, res) => {
    try {
        // We usually only want to show 'isActive' airports to the public
        const airports = await Airport.find({ isActive: true });
        res.status(200).json({ success: true, count: airports.length, data: airports });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get airport by IATA Code (e.g., LAX, DXB)
// @route   GET /api/airports/:iata
exports.getAirportByIata = async (req, res) => {
    try {
        const airport = await Airport.findOne({ iataCode: req.params.iata.toUpperCase() });
        if (!airport) {
            return res.status(404).json({ success: false, message: "Airport not found" });
        }
        res.status(200).json({ success: true, data: airport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update airport details
// @route   PUT /api/airports/:id
exports.updateAirport = async (req, res) => {
    try {
        const airport = await Airport.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!airport) {
            return res.status(404).json({ success: false, message: "Airport not found" });
        }
        res.status(200).json({ success: true, data: airport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Toggle Airport Status (Active/Inactive)
// @route   PATCH /api/airports/:id/status
exports.toggleAirportStatus = async (req, res) => {
    try {
        const airport = await Airport.findById(req.params.id);
        if (!airport) return res.status(404).json({ success: false, message: "Not found" });

        airport.isActive = !airport.isActive;
        await airport.save();

        res.status(200).json({ success: true, message: `Airport is now ${airport.isActive ? 'Active' : 'Inactive'}` });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};