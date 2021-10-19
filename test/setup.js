//To ensure DB is connected and server is initialized before mocha starts
const server = require('../server');
const mongoose = require('mongoose');

before(function () {
	return new Promise((resolve, reject) => {
		mongoose.connection.on('connected', function () {
			resolve()
		});
	})
})