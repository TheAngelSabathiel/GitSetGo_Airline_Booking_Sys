const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    bookingReference: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
        required: true
    },
    passengers: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        firstName: { type: String, required: true }, 
        lastName: { type: String, required: true },                  
        seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat" },
        fareClassId: { type: mongoose.Schema.Types.ObjectId, ref: "FareClass" },
        baggage: { type: Number, default: 7 },  
        subtotal: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Booked", "Cancelled", "Checked-In"],
            default: "Pending"
        }
    }],

    addOns: [{
        ancillaryServiceId: { type: mongoose.Schema.Types.ObjectId, ref: "AncillaryService" },
        quantity: { type: Number, default: 1 }
    }],
    paymentDetails: {
        method: String,
        status: {type: String, enum: ["Pending", "Confirmed", "Failed"], default: "Pending"},
    },
    
    totalPrice: { type: Number, required: true },
    expiresAt: { 
        type: Date
        // default: () => new Date(Date.now() + 30 * 60 * 1000),
        // index: { expires: 0 } 
    }

}, { timestamps: true });



module.exports = mongoose.model('Booking', bookingSchema);