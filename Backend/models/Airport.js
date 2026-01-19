const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
	iataCode : {
		type : String,
		required : [true, 'iataCode is required.'],
		uppercase : true,
		trim : true,
		minLength : 3,
		maxLength : 3
	},
	name : {
		type : String,
		required : [true, 'Airport name is required.']
	},
	city : {
		type : String,
		required : [true, 'City is required.']
	},
	country : {
		type : String,
		required : [true, 'Country is required.']
	},
	timeZone : {
		type : String,
		required : [true, 'Time zone is required.']
	},
    isActive : {
    	type : Boolean,
    	default : true
    }
});

module.exports = mongoose.model('Airport', airportSchema);