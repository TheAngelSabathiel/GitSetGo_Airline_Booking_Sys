const Booking = require("../models/Booking");
const Schedule = require("../models/Schedule");
const Seat = require("../models/FlightSeat");
const FareClass = require("../models/FareClass");
const Ancillary = require("../models/AncillaryService");

const { errorHandler } = require("../auth")

module.exports.createBooking = (req, res) => {

    const { scheduleId, passengers, addOns, paymentDetails, totalPrice } = req.body;

    const bookerId = req.user ? req.user.id : null;

    const requestSeat = passengers.map(p => p.seatId);

    return Schedule.findById(scheduleId).then(sched => {

        if (!sched) {
            return res.status(404).send({ message: "Flight schedule not found!" });
        }

        if (sched.status !== "Active") {
            return res.status(400).send({ message: `Flight is currently ${sched.status}. Bookings are not allowed.` });
        }

        return Booking.findOne({
            scheduleId: scheduleId,
            "passengers.seatId": { $in: requestSeat },
            "paymentDetails.status": { $in: ["Pending", "Confirmed"] }
        })
    }).then(seatTaken => {

        if (res.headersSent) return;

        if (seatTaken) {

            return res.status(409).send({ message: "Seat is already reserved. Please choose another seat." });
        }

        const updatedPassengers = passengers.map(p => ({...p, userId: bookerId, status: "Pending"}))

        let newBooking = new Booking({
            bookingReference: Math.random().toString(36).substring(2, 8).toUpperCase(),
            scheduleId: scheduleId,
            passengers: updatedPassengers,
            addOns: addOns,
            paymentDetails: {...paymentDetails, status: "Pending"},
            totalPrice: totalPrice
        });

        return newBooking.save();
    }).then(result => {

        if (res.headersSent || !result || !result._id) return;

        return res.status(201).send({ message: "Booking Success", data: result });
    }).catch(error => errorHandler(error, req, res));
};

module.exports.updateBooking = (req, res) => {

    const { passengers, addOns, paymentDetails } = req.body;

    return Booking.findByIdAndUpdate(req.params.bookingId, 
        {passengers, addOns, paymentDetails}, 
        {new: true}

        ).then(result => {

        if(result){
            res.status(200).send({message: "Update Success!", data: result})
        }else{ 
            res.status(404).send({message: "Booking not found!"})
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.passengerCheckIn = (req, res) => {

    const {bookingReference, lastName} = req.body

    return Booking.findOneAndUpdate(
        {
            bookingReference: bookingReference,
            "passengers.lastName": lastName
        },
        {
            $set: {"passengers.$.status": "Checked-In"}
        }, {
            new: true,
            projection: {
               passengers: {$elemMatch: {"lastName": lastName}},
               _id: 0
            }
        }
    )
    .then(result => {

        if(!result || !result.passengers){

            return res.status(404).send({message: "Check-In failed. Please verify your Reference, Lastname"});
        }

        return res.status(200).send({message: "Check-In success! Welcome aboard!.", data: result.passengers[0]});

    }).catch(error => errorHandler(error, req, res))
}

module.exports.getBookingDetails = (req, res) => {

    const { bookingReference } = req.body || {};

    let query = {};

    if (!bookingReference && !req.user) {

        return res.status(400).send({ message: "Search requires a Reference Code or Login." });
    }

    if (bookingReference) {

        query = { bookingReference: bookingReference.trim().toUpperCase() };

    } else {

        query = { "passengers.userId": req.user.id };
    }

    return Booking.findOne(query).sort({ createdAt: -1 })
    .populate({
        path: 'scheduleId',
        select: 'arrivalTime departureTime',
        populate: [
            {path: 'arrivalAirportId', model: 'Airport', select: 'iataCode name city country'},
            {path: 'departureAirportId', model: 'Airport', select: 'iataCode name city country'}
        ]
    })
    .populate([
        {path: 'passengers.seatId', select: 'seatNumber'},
        {path: 'passengers.fareClassId', select: 'code classType'},
        {path: 'addOns.ancillaryServiceId', select: 'serviceType name description'}
    ]).select('-__v')
    .then(result => {

        if(!result){
            return res.status(404).send({message: "Booking not found"})
        }

        return res.status(200).send({data: result})

    }).catch(error => errorHandler(error, req, res));
}


module.exports.getAllBooksByFlight = (req, res) => {

    return Booking.find({}).sort({scheduleId: 1, createdAt: -1})
    .populate({
        path: 'scheduleId',
        select: 'arrivalTime departureTime',
        populate: [
            {
                 path: 'arrivalAirportId', 
                 model: 'Airport',
                 select: 'iataCode name city country'
            },
            {
                path: 'departureAirportId',
                model: 'Airport', 
                select: 'iataCode name city country'
            }
        ]
    })
    .populate([
        {path: 'passengers.seatId', select: 'seatNumber'},
        {path: 'passengers.fareClassId', select: 'code classType baggageAllowance'},
        {path: 'addOns.ancillaryServiceId', select: 'serviceType name price'}
    ])
    .select('-__v')

    .then(result => {

        if(!result || result.length === 0) {

            return res.status(404).send({message: "Booking not found"})
        }

            return res.status(200).send({count: result.length, data: result})

    }).catch(error => errorHandler(error, req, res))
}
