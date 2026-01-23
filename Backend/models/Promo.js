const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
	code : {
		type : String,
    uppercase : true,
		required : [true, 'Promo Code is required.']
	},
	name : {
		type : String,
		required : true
	},
  description : {
		type : String,
		required : true
	},
	discount : {
		type : Number,
		default : 0
	},
	expiresAt : {
    type : Date,
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now()
  }
});

promoSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Promo', promoSchema);
