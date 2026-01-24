const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");

// Import the Airport controller
const {
    addAirport,
    getAllAirports,
    getAllActiveAirports,
    getAirportByIata,
    updateAirport,
    toggleAirportStatus
} = require('../controllers/airport');

router.post("/", verify, verifyAdmin. addAirport);

router.get("/", verify, verifyAdmin, getAllAirports);

router.get("/active", getAllActiveAirports);

router.get("/code/:iata", getAirportByIata);

router.put("/:airportId", verify, verifyAdmin, updateAirport);

router.patch("/:airportId", verify, verifyAdmin, toggleAirportStatus);

module.exports = router;