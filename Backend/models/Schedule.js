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
	availableEconomy : {
		type : Number,
		required : true
	},
	availableBusiness : {
		type : Number,
		required : true
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
    	enum : ["Active", "In-flight", "Delayed", "Cancelled", "Finished"],
    	default : "Active"
    }
}
// , {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// }
);

// scheduleSchema.virtual('computedStatus').get(function() {
//     const now = new Date();

//     if (this.status === "Cancelled" || this.status === "Delayed") {
//         return this.status;
//     }

//     if (now >= this.arrivalTime) {
//         return "Finished";
//     }

//     if (now >= this.departureTime && now < this.arrivalTime) {
//         return "In-flight";
//     }
	
//     return "Active";
// });

module.exports = mongoose.model('Schedule', scheduleSchema);
