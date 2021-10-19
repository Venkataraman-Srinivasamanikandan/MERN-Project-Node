const common = require("../helper/common");

const { model } = require('mongoose'),
	validator = require("node-validator"),
	async_handler = require('express-async-handler');

const super_admin = model('super_admin');

module.exports = {
	login: async_handler(async (req, res) => {
		let requestData = req.body;
		let check = validator.isObject()
			.withRequired('email', validator.isString({ regex: /.+@.+\..+/ }))
			.withRequired('password', validator.isString({ regex: /^(?=.*[\w\d]).+/ }));

		await common.validate(check, requestData, res);
		let userDetail = await super_admin.findOne({ email: requestData.email });
		if (!userDetail) {
			return res.status(400).json({ message: "Email doesn't exists" });
		}
		if (!common.decrypt_password(requestData.password, userDetail.password)) {
			return res.status(400).json({ message: "Invalid password" });
		}
		var JWTtoken = common.createPayload({
			_id: userDetail._id,
			name: userDetail.name,
			email: userDetail.email
		})
		return res.json({
			JWTtoken, data: {
				name: userDetail.name,
				email: userDetail.email
			}
		})
	})
};