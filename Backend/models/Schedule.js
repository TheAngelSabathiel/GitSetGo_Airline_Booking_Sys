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
	seating : {
		economy : {
			capacity : { type : Number },
			available : { type : Number }
		},
		business : {
			capacity : { type : Number },
			available : { type : Number }
		}
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
    status : {
    	type : String,
    	enum : ["Active", "Delayed", "Cancelled", "Finished"],
    	default : "Active"
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
