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
    fareClass : {
        type : String,
		enum : ["Economy", "Business"],
        default : "Economy"
    }
});

module.exports = mongoose.model('FlightSeat', flightSeatSchema);
