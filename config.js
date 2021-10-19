const joi = require("joi");

const envVarsSchema = joi
	.object()
	.keys({
		NODE_ENV: joi
			.string()
			.valid("production", "development", "local", "testing")
			.required(),
		PORT: joi.number().positive().required(),
		DBCONNECTION: joi.string().required()
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: "key" } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	port: process.env.PORT,
	dbConnection: process.env.DBCONNECTION,
	clientDomain: process.env.clientDomain,
	NODE_ENV: process.env.NODE_ENV
}