const User = require("../models/User");
const { errorHandler, createAccessToken } = require("../auth");
const bcrypt = require("bcryptjs");
const passport = require("../passport");
const { cloudinary } = require("../cloudinaryConfig");

module.exports.registerUser = (req, res) => {

	const emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

	if (!emailRegex.test(req.body.email)) {
		return res.status(400).send({error : "Email Invalid"});
	}
	if (req.body.phoneNo.length != 11) {
		return res.status(400).send({error : "Mobile Number Invalid"});
	}
	if (req.body.password.length < 8) {
		return res.status(400).send({error : "Password must be at least 8 characters"});
	}

	User.findOne({email : req.body.email, isRegistered : true})
	.then(foundUser => {
		if (foundUser) {
			res.status(409).send({
				message : "Email already in use by a registered user"
			})
			return null;
		}

		return bcrypt.hash(req.body.password, 12);
	})
	.then(hashedPassword => {
		if (hashedPassword == null) {
			return null;
		}

		let newUser = new User({
			title : req.body.title,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			middleName : req.body.middleName,
			email : req.body.email,
			password : hashedPassword,
			phoneNo : req.body.phoneNo,
			paymentInfo : req.body.paymentInfo,
			username : req.body.username,
			address : req.body.address,
			isRegistered : true
		});

		return newUser.save();
	})
	.then(registeredUser => {
		if (registeredUser) {

			const userResponse = registeredUser.toObject();
			delete userResponse.password;

			return res.status(201).send({
				message : "Registered Successfully",
				user : userResponse
			})
		}

		return;
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.loginUser = (req, res) => {
	const emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;
    let query = emailRegex.test(req.body.email) 
    	? { email : req.body.email , isRegistered : true }
    	: { username : req.body.email , isRegistered : true }

    User.findOne(query)
    .then(foundUser => {
    	if (!foundUser) {
    		res.status(404).send({
    			error : "User not found"
    		})
    		return null;
    	}

    	return bcrypt.compare(req.body.password, foundUser.password)
    	.then(isPasswordCorrect => {
    		return {
    			user : foundUser,
    			isPasswordCorrect : isPasswordCorrect
    		};
    	})
    })
    .then(verifiedUser => {
    	if (verifiedUser === null) {
    		return;
    	}

    	if (!verifiedUser.isPasswordCorrect) {
    		return res.status(401).send({
    			error : "Invalid credentials"
    		});
    	}

    	return res.status(200).send({
    		access : createAccessToken(verifiedUser.user)
    	});
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getProfile = (req, res) => {

	User.findById(req.user.id).select("-password")
	.then(user => {
		if (!user) {
			return res.status(404).send({error : "User not found"});
		}

		return res.status(200).send({user});
	})
	.catch(error => errorHandler(error, req, res))

}

module.exports.updatePassword = (req, res) => {
	if (req.body.newPassword.length < 8) {
		return res.status(400).send({
			error : "Password must be at least 8 characters"
		});
	}

	User.findByIdAndUpdate(req.user.id, { password : bcrypt.hashSync(req.body.newPassword, 12) }, { new : true })
	.then(user => {
		if (!user) {
			return	res.status(404).send({
				error : "User not found"
			});
		}

		return res.status(200).send({
			message : "Password changed successfully"
		});
	})
	.catch(error => errorHandler(error, req, res));
}
