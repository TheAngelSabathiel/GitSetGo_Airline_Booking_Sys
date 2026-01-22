const express = require('express');
const router = express.Router();

// Import the FareClass controller
const {
    createFareClass,
    getAllFareClasses,
    getFareClassesByType,
    updateFareClass,
    deleteFareClass
} = require('../controllers/fareClassController');

// Standard Routes
router
    .route('/')
    .get(getAllFareClasses) // GET all available classes
    .post(createFareClass); // POST a new fare class (e.g., 'Economy Saver')

// Route to filter by type (Economy or Business)
// Example: /api/fare-classes/type/Economy
router.get('/type/:type', getFareClassesByType);

// Routes for specific FareClass ID
router
    .route('/:id')
    .put(updateFareClass)
    .delete(deleteFareClass);

module.exports = router;