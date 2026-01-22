const AncillaryService = require('../models/AncillaryService');

// @desc    Create a new service (e.g., "In-flight Meal", "Extra Baggage")
// @route   POST /api/ancillaries
exports.createService = async (req, res) => {
    try {
        const service = await AncillaryService.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all active services for passengers to browse
// @route   GET /api/ancillaries
exports.getAllServices = async (req, res) => {
    try {
        const services = await AncillaryService.find({ isActive: true });
        res.status(200).json({ 
            success: true, 
            count: services.length, 
            data: services 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get services grouped by type (e.g., all "Food", all "Luggage")
// @route   GET /api/ancillaries/type/:type
exports.getServicesByType = async (req, res) => {
    try {
        const services = await AncillaryService.find({ 
            serviceType: req.params.type, 
            isActive: true 
        });
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update service details (price, description, or image path)
// @route   PUT /api/ancillaries/:id
exports.updateService = async (req, res) => {
    try {
        const service = await AncillaryService.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Soft delete/Deactivate a service
// @route   DELETE /api/ancillaries/:id
exports.deactivateService = async (req, res) => {
    try {
        const service = await AncillaryService.findByIdAndUpdate(
            req.params.id, 
            { isActive: false }, 
            { new: true }
        );
        
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, message: "Service deactivated" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};