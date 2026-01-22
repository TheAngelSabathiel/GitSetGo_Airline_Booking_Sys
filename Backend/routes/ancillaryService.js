const express = require('express');
const router = express.Router();

// Import the Ancillary controller
const {
    createService,
    getAllServices,
    getServicesByType,
    updateService,
    deactivateService
} = require('../controllers/ancillaryController');

// Main Routes
router
    .route('/')
    .get(getAllServices)    // Customers view available add-ons
    .post(createService);   // Admins add a new service

// Route to filter by type (e.g., /api/ancillaries/type/Meal)
router.get('/type/:type', getServicesByType);

// ID-specific Routes
router
    .route('/:id')
    .put(updateService)      // Edit price, description, or image
    .delete(deactivateService); // Soft delete (isActive: false)

module.exports = router;