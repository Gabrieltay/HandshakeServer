const request = require('request');
const config = require('config');
var exports = (module.exports = {});

var username = process.env.USERNAME || 'sbotuser';
var password = process.env.PASSWORD || 'ppian@3';

var authStr = Buffer.from(`${username}:${password}`).toString('base64');

var adhocOptions = {
	method: 'POST',
	url: `${config.get('endpoint')}/adhoc`,
	headers: {
		Authorization: `Basic ${authStr}`,
		'Content-Type': 'application/json',
	},
	body: {
		transactionID: 'XXXXX',
		transactionTime: 'YYYYYYYYYYY',
		data: {
			riskReport: {
				riskReportAttachment: {
					folder: '/',
					filename: 'riskreport2.pdf',
					uploadTime: 'YYYYYYYYYYY',
				},
			},
			dashboard: {
				localShareholdingCheck: (Math.random() * 100 + 1).toFixed(2),
				localShareholdingCompleteCheck: Math.random() >= 0.5,
				companyEmploymentSize: Math.floor(Math.random() * 1000 + 100),
				companyEmploymentSizeCompleteCheck: Math.random() >= 0.5,
				groupEmploymentSize: Math.floor(Math.random() * 1000 + 100),
				groupEmploymentSizeCompleteCheck: Math.random() >= 0.5,
			},
		},
	},
	json: true,
};

var detailedOptions = {
	method: 'POST',
	url: `${config.get('endpoint')}/detailed`,
	headers: {
		Authorization: `Basic ${authStr}`,
		'Content-Type': 'application/json',
	},
	body: {
		transactionID: 'XXXXX',
		transactionTime: 'YYYYYYYYYYY',
		data: {
			riskReport: {
				riskReportAttachment: {
					folder: '/',
					filename: 'riskreport3.pdf',
					uploadTime: 'YYYYYYYYYYY',
				},
			},
		},
	},
	json: true,
};

// padding
function pad(num) {
	return (num > 9 ? '' : '0') + num;
}

function adhocResponse(transactionID) {
	let now = new Date();

	adhocOptions.body.transactionID = transactionID;
	adhocOptions.body.transactionTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
		now.getHours()
	)}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
	adhocOptions.body.data.riskReport.riskReportAttachment.uploadTime = `${now.getFullYear()}${pad(
		now.getMonth() + 1
	)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
	console.log(adhocOptions);

	request(adhocOptions, function(error, response, body) {
		if (error) throw new Error(error);

		console.log(JSON.stringify(body));
	});
}

function detailedResponse(transactionID) {
	let now = new Date();

	detailedOptions.body.transactionID = transactionID;
	detailedOptions.body.transactionTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
		now.getHours()
	)}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
	detailedOptions.body.data.riskReport.riskReportAttachment.uploadTime = `${now.getFullYear()}${pad(
		now.getMonth() + 1
	)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
	console.log(detailedOptions);

	request(detailedOptions, function(error, response, body) {
		if (error) throw new Error(error);

		console.log(JSON.stringify(body));
	});
}

exports.adhocResponse = adhocResponse;
exports.detailedResponse = detailedResponse;
