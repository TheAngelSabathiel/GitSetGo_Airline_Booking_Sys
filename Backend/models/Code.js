const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
	codeString : {
		type : String,
		required : [true, 'Generated Code is required.']
	},
	email : {
		type : String,
		required : [true, 'Please provide email address of user.']
	},
	createdOn : {
		type : Date,
		default : Date.now
	}

});

codeSchema.index({ createdOn: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model('Code', codeSchema);