const express = require('express');
const router = express.Router();

// Import the Airport controller
const {
    addAirport,
    getAllAirports,
    getAirportByIata,
    updateAirport,
    toggleAirportStatus
} = require('../controllers/airportController');

// Standard Routes
router
    .route('/')
    .get(getAllAirports) // GET all active airports
    .post(addAirport);   // POST a new airport

// Route for searching by IATA code (e.g., /api/airports/LHR)
router
    .route('/code/:iata')
    .get(getAirportByIata);

// Routes for specific Airport ID (for administrative updates)
router
    .route('/:id')
    .put(updateAirport)
    .patch(toggleAirportStatus); // Using PATCH for partial update (status toggle)

module.exports = router;