const Booking = require("../models/Booking");
const Schedule = require("../models/Schedule");
const Seat = require("../models/FlightSeat");
const FareClass = require("../models/FareClass");
const Ancillary = require("../models/AncillaryService");

const { errorHandler } = require("../auth")

// Price = BaseFee + (Distance \times RatePerKm) + (Duration \times OperationalCostPerHour) + ancillaryFees

module.exports.createBooking = (req, res) => {

    const { scheduleId, passengers, addOns, paymentDetails } = req.body;

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
            paymentDetails: {...paymentDetails, status: "Pending"}
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

    const { bookingReference, firstName, lastName, email } = req.body;
    
    if (!bookingReference) {

        return res.status(400).send({ message: "Booking reference is required" });
    }
    
    const hasFullName = firstName && lastName;
    const hasEmail = email;
    
    if (!hasFullName && !hasEmail) {

        return res.status(400).send({ 
            message: "Please provide either your full name (first and last) or email address" 
        });
    }
    
    return Booking.findOne({ bookingReference: bookingReference.trim().toUpperCase() })
        .then(booking => {

            if (!booking) {

                return res.status(404).send({ 
                    message: "No booking found. Please verify your reference code." 
                });
            }
            
            if (booking.paymentDetails.status !== "Confirmed") {

                return res.status(400).send({
                    message: `Cannot check-in. Payment status is ${booking.paymentDetails.status}.`
                });
            }
            
            if (booking.expiresAt && new Date() > booking.expiresAt) {
                
                return res.status(400).send({ 
                    message: "Cannot check-in. The booking has expired." 
                });
            }
            
            let passenger;

            if (firstName && lastName) {

                passenger = booking.passengers.find(
                    p => p.firstName.toLowerCase() === firstName.trim().toLowerCase() && 
                         p.lastName.toLowerCase() === lastName.trim().toLowerCase());

            } else if (email) {

                passenger = booking.passengers.find(
                    p => p.email && p.email.toLowerCase() === email.trim().toLowerCase()
                );
            }
            
            if (!passenger) {

                return res.status(404).send({
                    message: firstName && lastName 
                        ? "Passenger not found. Please verify your full name."
                        : "Passenger not found. Please verify your email."
                });
            }
            
            if (passenger.status === "Checked-In") {

                return res.status(400).send({ 
                    message: "You have already checked in for this flight.",
                    data: passenger
                });
            }
            
            if (passenger.status === "Cancelled") {

                return res.status(400).send({ 
                    message: "Cannot check-in. This booking has been cancelled." 
                });
            }

            passenger.status = "Checked-In";
            return booking.save();
        })
        .then(result => {

            if (res.headersSent || !result) return;
            
            let checkedInPassenger;

            if (firstName && lastName) {

                checkedInPassenger = result.passengers.find(
                    p => p.firstName.toLowerCase() === firstName.trim().toLowerCase() &&
                         p.lastName.toLowerCase() === lastName.trim().toLowerCase());

            } else if (email) {

                checkedInPassenger = result.passengers.find(
                    p => p.email && p.email.toLowerCase() === email.trim().toLowerCase()
                );
            }
            
            return res.status(200).send({ 

                message: "Check-in successful! Welcome aboard!", 
                data: checkedInPassenger
            });
        })
        .catch(error => errorHandler(error, req, res));
};


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

        const isExpired = result.expiresAt && new Date() > result.expiresAt;

        return res.status(200).send({
            data: result,
            expired: isExpired,
            message: isExpired ? "This booking has expired" : "Booking found"
        })

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

module.exports.getFlightHistory = (req, res) => {

    return Booking.find({'passengers.userId':req.user.id}).sort({createdAt: -1})
    .populate({path: 'scheduleId',
        select: 'flightReference arrivalTime departureTime status',
        match: {status: {$in: ["Completed", "Cancelled"]}},
        populate: [
            {path: 'arrivalAirportId', model: 'Airport', select: 'iataCode name city country'},
            {path: 'departureAirportId', model: 'Airport', select: 'iataCode name city country'}
        ]
    })  
    .populate([
        {path: 'passengers.seatId', select: 'seatNumber'},
        {path: 'passengers.fareClassId', select: 'classType'}

    ]).select('-passengers.userId -passengers.baggage -passengers.subtotal -totalPrice -__v')

    .then(result => {

        const history = result.filter(r => r.scheduleId !== null);

        if(history.length === 0) {

            return res.status(404).send({ message: "No past or cancelled trips found." });
        }

        res.status(200).send({data: history});

    }).catch(error => errorHandler(error, req, res));
}

module.exports.getUpcommingFlight = (req, res) => {

    return Booking.find({'passengers.userId':req.user.id}).sort({createdAt: -1})
    .populate({path: 'scheduleId',
        select: 'flightReference arrivalTime departureTime status',
        match: {

            status: {$in: ["Active", "Delayed"]},
            departureTime: {$gte: Date.now()}
        },
        populate: [
            {path: 'arrivalAirportId', model: 'Airport', select: 'iataCode name city country'},
            {path: 'departureAirportId', model: 'Airport', select: 'iataCode name city country'}
        ]
    })  
    .populate([
        {path: 'passengers.seatId', select: 'seatNumber'},
        {path: 'passengers.fareClassId', select: 'classType'}

    ]).select('-passengers.userId -passengers.baggage -passengers.subtotal -totalPrice -__v')

    .then(result => {

        const upcomming = result.filter(r => r.scheduleId !== null);

        if(upcomming.length === 0) {

            return res.status(404).send({ message: "No upcomming or delayed trips found." });
        }

        res.status(200).send({data: upcomming});

    }).catch(error => errorHandler(error, req, res));
}

module.exports.updatePaymentStatus = (req, res) => {

    const { bookingReference } = req.params;
    const { paymentStatus } = req.body;

    if(!paymentStatus){

        return res.status(400).send({message: "Payment status is required"});
    }

    const validStatuses = ["Confirmed", "Failed"];

    if (!validStatuses.includes(paymentStatus)) {
        return res.status(400).send({ 
            message: "Invalid payment status. Must be 'Confirmed' or 'Failed'" 
        });
    }

    return Booking.findOne({bookingReference: bookingReference})
    .then(booking => {

        if (res.headersSent) return;

        if(!booking){
            return res.status(404).send({message: "Booking not found"})
        }

        if(booking.paymentDetails.status !== "Pending") {

            return res.status(400).send({
                message: `Payment status is already ${booking.paymentDetails.status}`
            })
        }

        if (booking.expiresAt && new Date() > booking.expiresAt) {
            return res.status(400).send({ 
                message: "Booking has expired. Cannot process payment." 
            });
        }

        booking.paymentDetails.status = paymentStatus;

        if (paymentStatus === "Confirmed") {
   
            booking.passengers.forEach(passenger => {
                passenger.status = "Confirmed";
            });

            booking.expiresAt = null;

        }else if(paymentStatus === "Failed") {

            booking.expiresAt = new Date();
        }
        
        return booking.save();  

    })
    .then(result => {

        if (res.headersSent || !result) return;

        return res.status(200).send({
            message: `Payment ${paymentStatus.toLowerCase()} successfully`, 
            data: result
        })         
    })
    .catch(error => errorHandler(error, req, res));
}