const mongoose = require('mongoose');

const ancillaryServiceSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, 'Name is required.']
	},
	price : {
		type : Number,
		required : [true, 'Price is required.']
	},
	description : {
		type : String,
		required : [true, 'Description is required.']
	},
	picture: {
        path : { type: String, default: null },
        filename : { type: String, default: null }
    },
    isActive : {
    	type : Boolean,
    	default : true
    }
});

module.exports = mongoose.model('AncillaryService', ancillaryServiceSchema);
