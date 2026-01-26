const Aircraft = require('../models/Aircraft');
const { errorHandler } = require("../auth");

module.exports.createAircraft = (req, res) => {
    Aircraft.findOne({model : req.body.model})
    .then(aircraft => {
        if (aircraft) {

            res.status(400).send({ 
                success: false, 
                message: "Aircraft already exists" 
            });
            return null;
        }

        const newAircraft = new Aircraft({
            model : req.body.model,
            capacityEconomy : req.body.capacityEconomy,
            capacityBusiness : req.body.capacityBusiness,
            price : req.body.price
        });

        return newAircraft.save();
    })
    .then(savedAircraft => {

        if (savedAircraft == null) {
            return;
        }

        return res.status(201).send({
            success : true,
            message : "Aircraft registered successfully",
            data : savedAircraft
        });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.updateAircraft = (req, res) => {

    const allowableFields = ["capacityEconomy", "capacityBusiness", "price"];

    let query = {};
    allowableFields.forEach(field => {
        query[field] = req.body[field]
    });

    Aircraft.findByIdAndUpdate(req.params.aircraftId, query, {extended : true});
    .then(aircraft => {
        if (!aircraft) {
            return res.status(404).send({
                error : "Aircraft not found"
            });
        }

        return res.status(200).send({
            success : true, 
            message : "Aircraft updated successfully",
            data : aircraft
        });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAircraftInfo = (req, res) => {
    Aircraft.findById(req.params.aircraftId)
    .then(aircraft => {
        if (!aircraft) {
            return res.status(404).send({
                error : "Aircraft not found"
            });
        }

        return res.status(200).send(aircraft);
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllActiveAircrafts = (req, res) => {
    Aircraft.find({isActive : true})
    .then(aircrafts => {
        if (aircrafts.length === 0) {
            return res.status(404).send({
                error : "No active aircrafts"
            });
        }

        return res.status(200).send(aircrafts);
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllAircrafts = (req, res) => {
    Aircraft.find()
    .then(aircrafts => {
        if (aircrafts.length === 0) {
            return res.status(404).send({
                error : "No aircrafts registered"
            });
        }

        return res.status(200).send(aircrafts);
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.toggleAircraftStatus = (req, res) => {
    Aircraft.findById(req.params.id)
    .then(aircraft => {
        if (!aircraft) {
            res.status(404).send({
                error : "Aircraft not found"
            });
            return null;
        }

        aircraft.isActive = !aircraft.isActive;
        return aircraft.save();
    })
    .then(savedAircraft => {
        if (savedAircraft == null) return;

        return res.status(200).send({
            success : true,
            message :  `Aircraft is now ${savedAircraft.isActive ? 'Active' : 'Inactive'}`
        })
    })
    .catch(error => errorHandler(error, req, res));
}
