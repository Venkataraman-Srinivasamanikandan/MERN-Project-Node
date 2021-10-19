const common = require('../helper/common');

const faker = require('faker'),
	{ model } = require('mongoose');

const super_admin = model('super_admin');

module.exports.getAdminEmail = () => {
	return new Promise(async (resolve, reject) => {
		try {
			var userDetail = await super_admin.findOne({}, { email: 1 });
			if (!userDetail) {
				var newUserDetail = await super_admin.create({
					name: faker.name.findName(),
					email: faker.internet.email(),
					password: common.encrypt_password("Test@123")
				})
				return resolve(newUserDetail.email)
			}
			else {
				return resolve(userDetail.email)
			}
		}
		catch (e) {
			throw new Error(e);
		}
	})
}