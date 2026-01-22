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
	location: {
    	type: {
      		type: String, 
      		enum: ['Point'], 
      		default: 'Point'
    	},
    	coordinates: {
      		type: [Number], // [Longitude, Latitude]
      		required: true
    	}
  	},
    isActive : {
    	type : Boolean,
    	default : true
    }
});

airportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Airport', airportSchema);
