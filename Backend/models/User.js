const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    middleName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phoneNo: {
        type: String,
        required: [true, 'Phone Number is Required']
    }
    ,
    birthDate: {
        type: Date,
        default: null
    },
    paymentInfo : [{
        paymentType : {
            type : String,
            default : null
        },
        accountDetail : {
            type : String,
            default : null
        }
    }],
    isRegistered: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        default: null,
        unique: true,
        sparse: true 
    },
    username: {
        type: String,
        default: null
    },
    picture: {
        path : { type: String, default: null },
        filename : { type: String, default: null }
    },
    createdAt: {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('User', userSchema);
