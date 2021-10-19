const mongoose = require("mongoose"),
	jwt = require('jsonwebtoken');

const super_admin = mongoose.model('super_admin');

const authKey = 'dJHQbHirBcmVtQvO';

module.exports = {
	tokenMiddleware: async_handler(async (req, res, next) => {
		let token = req.headers['authorization'];
		if (!token) {
			return res.status(401).send('unauthorized')
		}
		token = token.split(' ')[1];
		if (!token) {
			return res.status(401).send('unauthorized')
		} else {
			let payload = jwt.verify(token, authKey)
			var userData = await super_admin.findOne({ email: payload.secret.email });
			req.userDetail = userData;
			next();
		}
	})
};