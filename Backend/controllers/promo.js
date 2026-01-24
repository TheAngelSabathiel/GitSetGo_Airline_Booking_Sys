const Promo = require("../models/Promo");
const { errorHandler } = require("../auth");

module.exports.createPromo = (req, res) => {

	const expiryDate = new Date(req.body.expiresAt);

	Promo.findOne({code : req.body.code})
	.then(foundCode => {
		if (foundCode) {
			res.status(409).send({
				message : "Code already exists"
			});

			return null
		}

		const promo = new Promo({
			code : req.body.code.toUpperCase(),
			name : req.body.name,
			description : req.body.description,
			discount : req.body.discount,
			limit : req.body.limit,
			expiresAt : expiryDate
		});

		return promo.save();
	})
	.then(savedPromo => {
		if (savedPromo == null) {
			return;
		}

		return res.status(201).send({
			message : "Promo code created successfully",
			promo : savedPromo
		});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.getPromoDetails = (req, res) => {
	Promo.findById(req.params.promoId)
	.then(promo => {
		if (!promo) return res.status(404).send({ error : "Promo not found"})

		return res.status(200).send(promo);
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.getAllPromos = (req, res) => {
	Promo.find()
	.then(promos => {
		if (promos.length ===0) {
			return res.status(200).send({
				message : "No promos available",
				promos : []
			})
		}

		return res.status(200).send({
			success : true,
			message : "Promos available",
			promos : promos
		});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.verifyPromo = (req, res) => {
	Promo.findOne({code : req.body.code.toUpperCase()})
	.then(promo => {
		if (!promo || promo.limit === 0) {
			res.status(404).send({
				error : "Promo code is not available or limit has been reached"
			})
			return null;
		}

		if (promo.limit === null ) {
			res.status(200).send({
				success : true,
				message : "Promo redeemed successfully",
				promo : promo
			})
			return null;
		}

		promo.limit -= 1;
		return promo.save();
		
	})
	.then(savedPromo => {
		if (savedPromo == null) return;

		return 	res.status(200).send({
				success : true,
				message : "Promo redeemed successfully",
				promo : savedPromo
			});
	})
	.catch(error => errorHandler(error, req, res));
}