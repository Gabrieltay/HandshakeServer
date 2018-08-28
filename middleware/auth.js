const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'Hello World';
const JWT_EXPIRY = process.env.JWT_EXPIRY || 3600;

function verifyJWTToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
			if (err || !decodedToken) {
				return reject(err);
			}
			resolve(decodedToken);
		});
	});
}

exports.verifyJWT = function(req, res, next) {
	token = req.headers.authorization ? req.headers.authorization.split(/\s+/)[1] : null;

	verifyJWTToken(token)
		.then(decodedToken => {
			req.user = decodedToken.data;
			next();
		})
		.catch(err => {
			res.status(400).json({ message: 'Invalid auth token provided.' });
		});
};

exports.createJWTToken = function(data) {
	const user = {
		id: 1,
		username: data.username,
		password: data.password,
		grant_type: data.grant_type,
		access: 'basic',
	};
	console.log(data.username);
	let token = jwt.sign(
		{
			data: user,
		},
		JWT_SECRET,
		{
			expiresIn: JWT_EXPIRY,
			algorithm: 'HS256',
		}
	);
	return token;
};
