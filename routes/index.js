const express = require('express'),
	api = express.Router();

const controller = require('../controller/index');

api.post('/login', controller.superadmin.login)

module.exports = api;