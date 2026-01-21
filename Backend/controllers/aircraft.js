const Aircraft = require('../models/Aircraft');

// @desc    Register a new aircraft
// @route   POST /api/aircraft
exports.createAircraft = async (req, res) => {
    try {
        const aircraft = await Aircraft.create(req.body);
        res.status(201).json({ success: true, data: aircraft });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all aircraft
// @route   GET /api/aircraft
exports.getAllAircraft = async (req, res) => {
    try {
        const aircrafts = await Aircraft.find();
        res.status(200).json({ success: true, count: aircrafts.length, data: aircrafts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single aircraft by ID
// @route   GET /api/aircraft/:id
exports.getAircraftById = async (req, res) => {
    try {
        const aircraft = await Aircraft.findById(req.params.id);
        if (!aircraft) {
            return res.status(404).json({ success: false, message: 'Aircraft not found' });
        }
        res.status(200).json({ success: true, data: aircraft });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
};

// @desc    Update aircraft details
// @route   PUT /api/aircraft/:id
exports.updateAircraft = async (req, res) => {
    try {
        const aircraft = await Aircraft.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!aircraft) {
            return res.status(404).json({ success: false, message: 'Aircraft not found' });
        }
        res.status(200).json({ success: true, data: aircraft });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Soft delete (Deactivate) aircraft
// @route   DELETE /api/aircraft/:id
exports.deleteAircraft = async (req, res) => {
    try {
        // Instead of hard deleting, we usually set isActive to false for airline records
        const aircraft = await Aircraft.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        
        if (!aircraft) {
            return res.status(404).json({ success: false, message: 'Aircraft not found' });
        }
        res.status(200).json({ success: true, message: 'Aircraft deactivated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};