const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
	flightReference : {
    	type : String,
    	unique : true,
    	required : true,
    	uppercase : true
	},
	aircraftId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Aircraft"
    },
	arrivalAirportId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Airport"
    },
    departureAirportId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Airport"
    },
    departureTime: {
    	type : Date,
    	required : true
    },
    arrivalTime : {
    	type : Date,
    	required : true
    },
    price : {
    	type : Number,
    	required : true
    },
    status : {
    	type : String,
    	enum : ["Active", "Delayed", "Cancelled", "Completed"],
    	default : "Active"
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);