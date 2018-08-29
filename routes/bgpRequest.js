const express = require('express');
const config = require('config');
const Ajv = require('ajv');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:bgp');
const definitions = require('../definitions');
const response = require('../response');
const router = express.Router();
var ajv = new Ajv();

function generateResponse(statusCode, requestId, dataError) {
	return {
		requestID: requestId,
		dataError: dataError,
	};
}

router.post('/grantinfo', (req, res) => {
	const valid = definitions.validateGrantInfo(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
		if (config.get('response')) response.adhocResponse(req.body.transactionID);
	} else {
		res.status(400).json(
			generateResponse(400, req.body.transactionID, ajv.errorsText(definitions.validateGrantInfo.errors))
		);
	}
});

router.post('/grantinfo/:grantid', (req, res) => {
	const valid = definitions.validateUpdateGrant(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
	} else {
		res.status(400).json(
			generateResponse(400, req.body.transactionID, ajv.errorsText(definitions.validateUpdateGrant.errors))
		);
	}
});

router.post('/riskreport/adhoc', (req, res) => {
	const valid = definitions.validateAdhocRiskreport(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
	} else {
		res.status(400).json(
			generateResponse(400, req.body.transactionID, ajv.errorsText(definitions.validateAdhocRiskreport.errors))
		);
	}
});

router.post('/riskreport/detailed', (req, res) => {
	const valid = definitions.validateDetailedRiskreport(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
	} else {
		res.status(400).json(
			generateResponse(400, req.body.transactionID, ajv.errorsText(definitions.validateDetailedRiskreport.errors))
		);
	}
});

router.post('/watchblacklist', (req, res) => {
	const valid = definitions.validateUpdateBlacklistWatchlist(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
	} else {
		res.status(400).json(
			generateResponse(
				400,
				req.body.transactionID,
				ajv.errorsText(definitions.validateUpdateBlacklistWatchlist.errors)
			)
		);
	}
});

module.exports = router;
