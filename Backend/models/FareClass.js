const mongoose = require('mongoose');

const fareClassSchema = new mongoose.Schema({
	code : {
		type : String,
		required : [true, 'Fare Class Code is required.']
	},
	classType : {
		type : String,
		enum : ["Economy", "Business"],
		required : [true, 'Fare Class Type is required.']
	},
	baggageAllowance : {
		type : Number,
		default : 7
	},
	price : {
		type : Number,
		required : [true, 'Price is required.']
	}

});

module.exports = mongoose.model('FareClass', fareClassSchema);