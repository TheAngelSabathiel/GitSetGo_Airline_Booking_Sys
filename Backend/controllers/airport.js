const Airport = require('../models/Airport');
const { errorHandler } = require("../auth");

module.exports.addAirport = (req, res) => {
    Airport.findOne({ iataCode: req.body.iataCode.toUpperCase() });
    .then(existingAirport => {
        if (existingAirport) {
            res.status(400).send({ 
                success: false, 
                message: "Airport with this IATA code already exists" 
            });
            return null;
        }

        const airport = new Airport({
            iataCode : req.body.iataCode.toUpperCase(),
            name : req.body.name,
            city : req.body.city,
            country : req.body.country,
            location : {
                type : "Point",
                coordinates : [req.body.latitude, req.body.longitude]
            }
        });

        return airport.save();
    })
    .then(airport => {
        if (airport === null) return;

        return res.status(201).send({
            success : true,
            message : "Airport registered successfully",
            data : airport
        });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllAirports = (req, res) => {
    Airport.find()
    .then(airports => {
        if (airports.length === 0) {
            return res.status(200).send({
                message : "No airports found"
            })
        }

        return res.status(200).send({
            success : true,
            count : airports.length,
            data : airports
        });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllActiveAirports = (req, res) => {
    Airport.find({isActive : true })
    .then(airports => {
        if (airports.length === 0) {
            return res.status(200).send({
                message : "No active airports found"
            })
        }

        return res.status(200).send({
            success : true,
            count : airports.length,
            data : airports
        });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAirportByIata = (req, res) => {
    Airport.findOne({ iataCode : req.params.iata.toUpperCase() })
    .then(airport => {
        if (!airport) {
            return res.status(404).send({
                message : "Airport not found"
            })
        }

        return res.status(200).send({
            success : true,
            data : airport
        })
    })
    .catch(error=> errorHandler(error, req, res));
}

module.exports.updateAirport = (req, res) => {

    const query = {
        name : req.body.name,
        description : req.body.description
    }

    Airport.findByIdAndUpdate(req.params.airportId, query, {new : true})
    .then(airport => {
        if (!airport) {
            return res.status(404).send({
                error : "Airport not found"
            });
        }

        return res.status(200).send({
            success : true, 
            updatedAirport : airport,
            message : "Airport info updated successfully"
        })
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.toggleAirportStatus = (req, res) => {
    Airport.findById(req.params.id)
    .then(airport => {
        if (!airport) {
            res.status(404).send({
                error : "Airport not found"
            });
            return null;
        }

        airport.isActive = !airport.isActive;
        return airport.save();
    })
    .then(savedAirport => {
        if (savedAirport == null) return;

        return res.status(200).send({
            success : true,
            message :  `Airport is now ${airport.isActive ? 'Active' : 'Inactive'}`
        })
    })
    .catch(error => errorHandler(error, req, res));
}
