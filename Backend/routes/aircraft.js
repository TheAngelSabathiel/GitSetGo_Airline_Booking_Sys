const express = require('express');
const router = express.Router();

// Import the controller methods
const {
    createAircraft,
    getAllAircraft,
    getAircraftById,
    updateAircraft,
    deleteAircraft
} = require('../controllers/aircraftController');

// Routes for: /api/aircraft
router
    .route('/')
    .get(getAllAircraft)
    .post(createAircraft);

// Routes for: /api/aircraft/:id
router
    .route('/:id')
    .get(getAircraftById)
    .put(updateAircraft)
    .delete(deleteAircraft);

module.exports = router;