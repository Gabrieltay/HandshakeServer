const express = require('express');
const config = require('config');
const helmet = require('helmet');
const debug = require('debug')('app:index');
const hsRoutes = require('./routes/bgpRequest');
const hsToken = require('./routes/bgpToken');
const auth = require('./middleware/auth');
const app = express();

console.log(`Running in ${config.get('environment')} env`);
// Declaring express middleware
app.use(express.json());
app.use(express.urlencoded());

// Using third-party middleware
app.use(helmet());

// Using customised middleware
app.use(auth.verifyJWT);
//app.use(httpLogger.morgan);

// Assign routes to express BGP requests
app.use('/bgp', hsRoutes);

app.use('/api', hsToken);

// Declare default endpoint
app.get('/', (req, res) => {
	debug('Welcome to bgphs pseudo API server');
	res.send({
		Message: 'Welcome to bgphs pseudo API server',
	});
});

// Configure express server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => debug(`Listening on port ${PORT}`));
