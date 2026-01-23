const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
	model : {
		type : String,
		required : [true, 'Aircraft model is required.']
	},
	capacityEconomy : {
		type : Number,
		required : [true, 'Please provide capacity of Economy Seating.']
	},
	capacityBusiness : {
		type : Number,
		required : [true, 'Please provide capacity of Business Seating.']
	},
	price : {
		baseFee : {
			type : Number,
			required : true
		},
		distanceRate : {
			type : Number,
			required : true
		},
		operationalRate : {
			type : Number,
			required : true
		},
	},
    registeredOn : {
        type : Date,
        default : Date.now
    },
    isActive : {
    	type : Boolean,
    	default : true
    }
});

module.exports = mongoose.model('Aircraft', aircraftSchema);
