const Schedule = require('../models/Schedule');
const Aircraft = require('../models/Aircraft');
const { errorHandler } = require("../auth");

module.exports.createSchedule = (req, res) => {
    if (req.body.departureAirportId === req.body.arrivalAirportId) {
            return res.status(400).send({ 
                success: false, 
                message: "Departure and Arrival airports cannot be the same." 
            });
    }

    const bufferMs = 1 * 60 * 60 * 1000; 

    Promise.all([
        Schedule.findOne({
            aircraftId : req.body.aircraftId,
            $expr : {
                $and : [
                    {
                        $lt : [
                            { $subtract : [ "$departureTime" , bufferMs ] }
                            ,
                            new Date(req.body.arrivalTime)
                        ]
                    }
                    ,
                    {
                        $gt : [
                            { $add : [ "$arrivalTime" , bufferMs ] }
                            ,
                            new Date(req.body.departureTime)
                        ]
                    }
                ]
            }
        })
        .select("flightReference")
        ,
        Aircraft.findById(req.body.aircraftId).select("capacityEconomy capacityBusiness")
    ])
    .then(([conflict, aircraft]) => {
        if (conflict) {
            res.status(409).send({
            message: "Aircraft unavailable due to turnaround requirements (1h buffer)",
            conflict: conflict.flightReference
            });
            return null;
        }
        
        if (!aircraft) {
            res.status(404).send({message : "Aircraft not found"});
            return null;
        }

        const schedule = new Schedule({
            flightReference : req.body.aircraftCode + (Math.floor(Math.random()*999)).toString(),
            aircraftId : req.body.aircraftId,
            availableEconomy : aircraft.capacityEconomy,
            availableBusiness : aircraft.capacityBusiness,
            arrivalAirportId : req.body.arrivalAirportId,
            departureAirportId : req.body.departureAirportId,
            arrivalTime : req.body.arrivalTime,
            departuretime : req.body.departureTime
        });

        return schedule.save()
    })
    .then(savedSchedule => {
        if (savedSchedule == null) {
            return;
        }

        return res.status(201).send({ success: true, data: savedSchedule });       
    })
    .catch(error => errorHandler(error, req, res)});
}

module.exports.filterSchedulesByStatus = (req, res) => {
    Schedule.find({status : req.body.status})
        .populate('aircraftId', 'airline model capacityEconomy capacityBusiness price')
        .populate('departureAirportId', 'name iataCode city country location')
        .populate('arrivalAirportId', 'name iataCode city country location')
        .sort({ departureTime: 1 })
    .then(schedules => {
        return res.status(200).send({ 
                success: true, 
                count: schedules.length, 
                data: schedules 
                });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllSchedules = (req, res) => {
    Schedule.find()
        .populate('aircraftId', 'airline model capacityEconomy capacityBusiness price')
        .populate('departureAirportId', 'name iataCode city country location')
        .populate('arrivalAirportId', 'name iataCode city country location')
        .sort({ departureTime: 1 })
    .then(schedules => {
        return res.status(200).send({ 
                success: true, 
                count: schedules.length, 
                data: schedules 
                });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.searchFlights = (req, res) => {
    const { from, to, date } = req.body;

    let query = { status: "Active" };
    if (from) query.departureAirportId = from;
    if (to) query.arrivalAirportId = to;

    if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);
        query.departureTime = { $gte: start, $lt: end };
    }

    Schedule.find(query)
        .populate('aircraftId', 'airline model capacityEconomy capacityBusiness price')
        .populate('departureAirportId', 'name iataCode city country location')
        .populate('arrivalAirportId', 'name iataCode city country location')
        .sort({ departureTime: 1 })
    .then(schedules => {
        return res.status(200).send({ 
                success: true, 
                count: schedules.length, 
                data: schedules 
                });
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.updateStatus = (req, res) => {
    const { status } = req.body;
    Schedule.findByIdAndUpdate(req.params.scheduleId, { status }).select("status")
    .then(schedule => {
        if (schedule.status === status) {
            return res.status(200).send({ message : `Status was already set to ${status}`);
        }

        return res.status(200).send({ success : true, data : schedule, message : "Status was changed successfully"});
    })
    .catch(error =>errorHandler(error, req, res));
}
