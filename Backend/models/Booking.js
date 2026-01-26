const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	passengers: [{
				userId: {
        			type : mongoose.Schema.Types.ObjectId,
        			ref : "User"
    			},
    			seatId: {
        			type : mongoose.Schema.Types.ObjectId,
        			ref : "FlightSeat"
    			},
				baggage : {
					type : Number,
					default : 7
				},
				promo : {
					code : { type : String },
					name : { type : String },
					discount : { type : Number }
				},
				subtotal : {
					type : Number,
					required : [true, 'Price is required.']
				},
				status : {
					type : String,
					enum : ["Booked", "Cancelled", "Checked-in"],
					default : "Booked"
				}
	}],
    scheduleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Schedule"
    },
    addOns : [{
    			ancillaryServiceId : {
        			type : mongoose.Schema.Types.ObjectId,
       				ref : "AncillaryService"
    			},
    			quantity : {
    				type : Number
    			}
    }],
	paymentStatus : {
		type : String,
		enum : ["Pending", "Confirmed", "Failed"],
		default : "Pending"
	},
	totalPrice : {
		type : Number,
		required : [true, 'Price is required.']
	},
	bookingReference: {
    	type : String,
    	unique : true,
    	required : true,
    	uppercase : true
	},
    createdAt: {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
