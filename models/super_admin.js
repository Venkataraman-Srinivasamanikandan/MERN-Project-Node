const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Super_admin_schema = new Schema({
	"name": {
		type: String,
		required: true,
		trim: true
	},
	"email": {
		type: String,
		match: /.+@.+\..+/,
		required: true,
		lowercase: true,
		unique: true,
		index: true
	},
	"password": {
		type: String,
		required: true
	}
},
	{ timestamps: true }
);

module.exports = mongoose.model('super_admin', Super_admin_schema, 'super_admin');
