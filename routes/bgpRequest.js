const express = require('express');
const Ajv = require('ajv');
const debug = require('debug')('app:bgp');
const definitions = require('../definitions');
const router = express.Router();
var ajv = new Ajv();

const persons = [];

function generateResponse(statusCode, requestId, dataError) {
	return {
		requestID: requestId,
		dataError: dataError,
	};
}

router.post('/grantinfo', (req, res) => {
	debug(req.headers);
	const valid = definitions.validate(req.body);
	if (valid) {
		res.status(200).json(generateResponse(200, req.body.transactionID, null));
	} else {
		res.status(400).json(
			generateResponse(400, req.body.transactionID, ajv.errorsText(definitions.validate.errors))
		);
	}
});

// GET - sample URL: http://localhost:3000/api/persons/
router.get('/', (req, res) => {
	if (!Array.isArray(persons) || !persons.length) {
		res.status(400).send('Invalid List');
	} else {
		res.send(persons);
	}
});

// GET - sample URL: http://localhost:3000/api/persons/JohnDoe
router.get('/:name', (req, res) => {
	let person = persons.find(p => p.name === req.params.name);
	if (!person) {
		debug('Invalid Person');
		res.status(400).send('Invalid Person');
	} else {
		res.send(person);
	}
});

// DELETE - sample URL: http://localhost:3000/api/persons/JohnDoe
router.delete('/:name', (req, res) => {
	let person = persons.find(p => p.name === req.params.name);
	if (!person) {
		debug('Invalid Person');
		res.status(400).send('Invalid Person');
	} else {
		const index = persons.indexOf(person);
		persons.splice(index, 1);
		res.send(persons);
	}
});

// PUT - sample URL: http://localhost:3000/api/persons/JohnDoe
router.put('/:name', (req, res) => {
	let person = persons.find(p => p.name === req.params.name);
	if (!person) {
		debug('Invalid Person');
		res.status(400).send('Invalid Person');
	} else {
		persons.splice(person, 1, req.body);
		res.send(persons);
	}
});

// POST - sample URL: http://localhost:3000/api/persons/
router.post('/', (req, res) => {
	const valid = definitions.validate(req.body);
	if (valid) {
		persons.push(req.body);
		res.send(persons);
	} else {
		res.status(400).send(`Invalid ${ajv.errorsText(definitions.validate.errors)}`);
	}
});

module.exports = router;
