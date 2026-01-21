// Server Dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
// const bookingRoutes = require("./routes/booking");
// const scheduleRoutes = require("./routes/schedule");
const aircraftRoutes = require("./routes/aircraft");
const airportRoutes = require("./routes/airport");
// const flightSeatRoutes = require("./routes/flightSeat");
// const fareClassRoutes = require("./routes/fareClass");
// const ancillaryServiceRoutes = require("./routes/ancillaryService");
const codeRoutes = require("./routes/code");

// Google API Client
const passport = require('passport');
const session = require('express-session');
require('./passport');

// Environment Setup 
require("dotenv").config();

// Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// CORS Setup
app.use(cors());

// Google Login
app.use(session({
    secret: process.env.GOOGLE_clientSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.set("runValidators", true);
mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.on("error", console.error.bind(console,"Database Connection Error."));
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

//Routes Middlewares

app.use("/users", userRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/schedules", scheduleRoutes);
app.use("/aircrafts", aircraftRoutes);
app.use("/airports", airportRoutes);
// app.use("/flight-seats", flightSeatRoutes);
// app.use("/fare-classes", fareClassRoutes);
// app.use("/ancillary-services", ancillaryServiceRoutes);
app.use("/codes", codeRoutes);



if(require.main === module) {
	app.listen(process.env.PORT || 3000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
	});
}
