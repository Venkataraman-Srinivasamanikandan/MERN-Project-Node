const bcrypt = require('bcrypt'),
	validator = require("node-validator"),
	jwt = require('jsonwebtoken');

const saltRounds = 10,
	authKey = 'dJHQbHirBcmVtQvO';

exports.encrypt_password = (password) => {
	return bcrypt.hashSync(password, saltRounds);
}

exports.decrypt_password = (check_password, password) => {
	return bcrypt.compareSync(check_password, password);
}

exports.createPayload = (key) => {
	return jwt.sign({ secret: key }, authKey, { expiresIn: 180 * 60 });
}

exports.validate = (check, body, res) => {
	return new Promise((resolve, reject) => {
		validator.run(check, body, (errCount, errs) => {
			if (errCount > 0) {
				res.status(400);
				return reject({ message: 'Invalid parameters', stack: errs })
			}
			resolve(true)
		})
	})
}