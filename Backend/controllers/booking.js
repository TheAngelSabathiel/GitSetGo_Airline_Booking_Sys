const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');
const crypto = require('crypto'); // Built-in Node.js module

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const { scheduleId, passengers, addOns, totalPrice } = req.body;

        // 1. Check if the schedule exists and is active
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule || schedule.status !== "Active") {
            return res.status(400).json({ success: false, message: "Flight schedule is not available." });
        }

        // 2. Generate a unique 6-character Booking Reference (PNR)
        const bookingReference = crypto.randomBytes(3).toString('hex').toUpperCase();

        // 3. Create the booking
        const newBooking = await Booking.create({
            scheduleId,
            passengers,
            addOns,
            totalPrice,
            bookingReference,
            paymentStatus: "Pending" // Default to pending until payment gateway responds
        });

        res.status(201).json({
            success: true,
            message: "Booking initiated successfully",
            data: newBooking
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get booking details by Reference (PNR)
// @route   GET /api/bookings/:reference
exports.getBookingByReference = async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingReference: req.params.reference.toUpperCase() })
            .populate('passengers.userId', 'name email')
            .populate('scheduleId')
            .populate('passengers.seatId');

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Payment Status (to be called by payment webhook)
// @route   PATCH /api/bookings/:id/payment
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body; // "Confirmed" or "Failed"
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: status },
            { new: true }
        );

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};