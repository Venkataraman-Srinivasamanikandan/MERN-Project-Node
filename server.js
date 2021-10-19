require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }),
	require("./models/db");

const config = require("./config");
const { notFound, errorHandler } = require('./middleware/error')

const express = require('express'),
	logger = require('morgan'),
	https = require('https'),
	cors = require('cors'),
	http = require('http'),
	fs = require('fs');


const app = express();
app.use(cors());

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (config.NODE_ENV == 'production') {
	//This if block will block all other origins except the frontend Domain that is provided in this block.
	var whitelist = config.clientDomain;
	var corsOptions = {
		origin: function (origin, callback) {
			if (origin.search("^.*" + whitelist + ".*$") > -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		optionsSuccessStatus: 200,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'cache-control', 'authorization'],
		credentials: true
	}
	app.use(cors(corsOptions))
}
else {
	app.use(cors());
}

const routes = require('./routes/index');

app.get("/", (req, res) => {
	return res.json({ msg: 'Hello' })
})
app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

let server;

if (config.NODE_ENV == 'production') {
	var options = {
		key: fs.readFileSync(config.key),
		cert: fs.readFileSync(config.crt),
	};
	server = https.createServer(options, app);
}
else {
	server = http.createServer(app);
}

server.listen(config.port, () => console.log(`Express server running on port ` + config.port));

module.exports = server;


