const mongoose = require('mongoose');

const flightSeatSchema = new mongoose.Schema({
	scheduleId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Schedule"
    },
	seatNumber: {
        type : String,
        required : true
    },
    fareClassId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FareClass"
    }
});

module.exports = mongoose.model('FlightSeat', flightSeatSchema);