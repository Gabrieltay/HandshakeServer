const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

function getCurrentTimestamp() {
	var date = new Date();
	date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
	date.setMinutes(0);
	date.setSeconds(0);

	return Math.floor(date.valueOf() / 1000);
}

router.post('/Token', (req, res) => {
	res.status(200).json({
		access_token: auth.createJWTToken(req.body),
		token_type: 'bearer',
		expires_in: 3600,
		timestamp: getCurrentTimestamp(),
	});
});

module.exports = router;
