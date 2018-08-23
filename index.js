const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:index');
const hsRoutes = require('./routes/bgpRequest');
const app = express();
const aws = require('aws-sdk');

let env = new aws.S3({
	environment: process.env.NODE_ENV,
});

console.log(env);
// Declaring express middleware
app.use(express.json());

// Using third-party middleware
app.use(helmet());

// Using customised middleware
//app.use(httpLogger.morgan);

// Assign routes to express Application
app.use('/bgp', hsRoutes);

// Declare default endpoint
app.get('/', (req, res) => {
	res.send({
		Message: 'Welcome to bgphs pseudo API server',
	});
});

// Configure express server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => debug(`Listening on port ${PORT}`));
