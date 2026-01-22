const FareClass = require('../models/FareClass');

// @desc    Create a new Fare Class
// @route   POST /api/fare-classes
exports.createFareClass = async (req, res) => {
    try {
        const fareClass = await FareClass.create(req.body);
        res.status(201).json({ success: true, data: fareClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all Fare Classes
// @route   GET /api/fare-classes
exports.getAllFareClasses = async (req, res) => {
    try {
        const fareClasses = await FareClass.find();
        res.status(200).json({ success: true, count: fareClasses.length, data: fareClasses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get Fare Classes by Type (Economy or Business)
// @route   GET /api/fare-classes/type/:type
exports.getFareClassesByType = async (req, res) => {
    try {
        const fareClasses = await FareClass.find({ classType: req.params.type });
        res.status(200).json({ success: true, data: fareClasses });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update Fare Class details
// @route   PUT /api/fare-classes/:id
exports.updateFareClass = async (req, res) => {
    try {
        const fareClass = await FareClass.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!fareClass) {
            return res.status(404).json({ success: false, message: "Fare class not found" });
        }
        res.status(200).json({ success: true, data: fareClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a Fare Class
// @route   DELETE /api/fare-classes/:id
exports.deleteFareClass = async (req, res) => {
    try {
        const fareClass = await FareClass.findByIdAndDelete(req.params.id);
        if (!fareClass) {
            return res.status(404).json({ success: false, message: "Fare class not found" });
        }
        res.status(200).json({ success: true, message: "Fare class deleted" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};