const Ajv = require('ajv');
var ajv = new Ajv();
var exports = (module.exports = {});

const typeSchema = {
	$id: 'bgp/schemas/type',
	definitions: {
		int: { type: 'integer' },
		str: { type: 'string' },
		str8: {
			type: ['string', 'null'],
			maxLength: 8,
		},
		str10: {
			type: ['string', 'null'],
			maxLength: 10,
		},
		str20: {
			type: ['string', 'null'],
			maxLength: 20,
		},
		str50: {
			type: ['string', 'null'],
			maxLength: 50,
		},
		str66: {
			type: ['string', 'null'],
			maxLength: 66,
		},
		str100: {
			type: ['string', 'null'],
			maxLength: 100,
		},
		str150: {
			type: ['string', 'null'],
			maxLength: 150,
		},
		str254: {
			type: ['string', 'null'],
			maxLength: 254,
		},
		timestamp: {
			pattern: '^[0-9]{14}$',
		},
	},
};

const grantInfoSchema = {
	$id: 'bgp/schemas/grantInfo',
	type: 'object',
	properties: {
		transactionID: {
			pattern: '^[a-zA-Z0-9]{8}-([A-Z0-9]{4}-[A-Z0-9]{4}|[A-Z0-9]{4})$',
		},
		transactionTime: { $ref: 'type#/definitions/timestamp' },
		response: {
			type: 'boolean',
		},
		applicationInfo: { $ref: 'applicationInfo' },
		applicationContactInfo: { $ref: 'contactInfo' },
		applicationLocationDeployed: { $ref: 'locationDeployed' },
		claimInfo: { $ref: 'claimInfo' },
		claimContactInfo: { $ref: 'contactInfo' },
		claimLocationDeployed: { $ref: 'locationDeployed' },
		companyGeneralInfo: { $ref: 'companyGeneralInfo' },
		projectInfo: { $ref: 'projectInfo' },
	},
	required: [
		'transactionID',
		'transactionTime',
		'response',
		'applicationInfo',
		'applicationContactInfo',
		'claimInfo',
		'claimContactInfo',
		'claimLocationDeployed',
		'projectInfo',
	],
};

const applicationInfoSchema = {
	$id: 'bgp/schemas/applicationInfo',
	type: 'object',
	properties: {
		applicationID: {
			pattern: '[a-zA-Z0-9]{8}',
		},
		userNric: { $ref: 'type#/definitions/str20' },
		userName: { $ref: 'type#/definitions/str100' },
		industryType: { $ref: 'type#/definitions/str50' },
		developmentCategory: { $ref: 'type#/definitions/str50' },
		functionalArea: { $ref: 'type#/definitions/str50' },
		subFunctionalArea: { $ref: 'type#/definitions/str50' },
		applicationStatus: { $ref: 'type#/definitions/str100' },
		firstSubmissionDate: { $ref: 'type#/definitions/timestamp' },
		submissionDate: { $ref: 'type#/definitions/timestamp' },
	},
	required: [
		'applicationID',
		'userNric',
		'industryType',
		'developmentCategory',
		'functionalArea',
		'subFunctionalArea',
		'applicationStatus',
		'firstSubmissionDate',
		'submissionDate',
	],
};

const contactInfoSchema = {
	$id: 'bgp/schemas/contactInfo',
	type: ['object', 'null'],
	properties: {
		contactPersonName: { $ref: 'type#/definitions/str254' },
		contactPersonDesignation: { $ref: 'type#/definitions/str' },
		contactPersonPhone: { $ref: 'type#/definitions/str' },
		contactPersonEmail: { format: 'email' },
		contactPersonSecondaryEmail: { format: 'email' },
		correspondenceAddress: { $ref: 'address' },
		lofAddresseeName: { $ref: 'type#/definitions/str254' },
		lofAddresseeDesignation: { $ref: 'type#/definitions/str66' },
		lofAddresseeEmail: { format: 'email' },
	},
	required: [
		'contactPersonName',
		'contactPersonDesignation',
		'contactPersonPhone',
		'contactPersonEmail',
		'lofAddresseeName',
		'lofAddresseeDesignation',
		'lofAddresseeEmail',
	],
};

const addressSchema = {
	$id: 'bgp/schemas/address',
	type: ['object', 'null'],
	properties: {
		addressType: { type: ['string', 'null'], maxLength: 30 },
		foreignAddress1: { type: ['string', 'null'], maxLength: 60 },
		foreignAddress2: { type: ['string', 'null'], maxLength: 60 },
		block: { type: ['string', 'null'], maxLength: 10 },
		street: { type: ['string', 'null'], maxLength: 64 },
		level: { type: ['string', 'null'], maxLength: 3 },
		buildingName: { type: ['string', 'null'], maxLength: 64 },
		unit: { type: ['string', 'null'], maxLength: 5 },
		postalCode: { type: ['string', 'null'], maxLength: 6 },
	},
};

const locationDeployedSchema = {
	$id: 'bgp/schemas/locationDeployed',
	type: ['object', 'null'],
	properties: {
		locationDeployedType: { $ref: 'type#/definitions/str100' },
		locationDeployedAddresses: { $ref: 'address' },
		locationDeployedProjectAddress: { type: ['string', 'null'], maxLength: 500 },
	},
};

const claimInfoSchema = {
	$id: 'bgp/schemas/claimInfo',
	type: ['object', 'null'],
	properties: {
		applicationID: {
			pattern: '^[a-zA-Z0-9]{8}-[A-Z0-9]{4,5}$',
		},
		claimantNRIC: { $ref: 'type#/definitions/str20' },
		claimantName: { $ref: 'type#/definitions/str100' },
		approvedGrantAmount: { type: 'string' },
		claimStatus: { $ref: 'type#/definitions/str100' },
		firstSubmissionDate: { $ref: 'type#/definitions/timestamp' },
		submissionDate: { $ref: 'type#/definitions/timestamp' },
	},
	required: [
		'applicationID',
		'claimantNRIC',
		'claimantName',
		'approvedGrantAmount',
		'claimStatus',
		'firstSubmissionDate',
		'submissionDate',
	],
};

const companyGeneralInfoSchema = {
	$id: 'bgp/schemas/companyGeneralInfo',
	type: 'object',
	properties: {
		companyUEN: { $ref: 'type#/definitions/str10' },
	},
};

const projectInfoSchema = {
	$id: 'bgp/schemas/projectInfo',
	type: ['object', 'null'],
	properties: {
		projectTitle: { $ref: 'type#/definitions/str100' },
		startDate: { $ref: 'type#/definitions/str8' },
		endDate: { $ref: 'type#/definitions/str8' },
		cost: {
			type: ['array', 'null'],
			items: {
				$ref: 'cost',
			},
		},
	},
	required: ['projectTitle', 'startDate', 'endDate'],
};

const costSchema = {
	$id: 'bgp/schemas/cost',
	type: ['object', 'null'],
	properties: {
		type: { $ref: 'type#/definitions/str150' },
		vendorName: { $ref: 'type#/definitions/str150' },
		vendorUEN: { $ref: 'type#/definitions/str20' },
		vendorSgRegisteredCheck: { type: ['boolean', 'null'] },
	},
	required: ['type', 'vendorName', 'vendorUEN', 'vendorSgRegisteredCheck'],
};

const updateGrantSchema = {
	$id: 'bgp/schemas/updateGrant',
	type: 'object',
	properties: {
		transactionID: {
			pattern: '^[a-zA-Z0-9]{8}-([A-Z0-9]{4}-[A-Z0-9]{4}|[A-Z0-9]{4})$',
		},
		transactionTime: { $ref: 'type#/definitions/timestamp' },
		type: { $ref: 'type#/definitions/str50' },
		response: {
			type: 'boolean',
		},
		data: {
			anyOf: [{ $ref: 'updateGrantOfficer' }, { $ref: 'updateGrantStatus' }],
		},
	},
	required: ['transactionID', 'transactionTime', 'type', 'response', 'data'],
};

const updateGrantOfficerSchema = {
	$id: 'bgp/schemas/updateGrantOfficer',
	type: 'object',
	properties: {
		role: { $ref: 'type#/definitions/str' },
		officerID: { $ref: 'type#/definitions/str' },
		officerName: { $ref: 'type#/definitions/str' },
	},
	required: ['role', 'officerID', 'officerName'],
};

const updateGrantStatusSchema = {
	$id: 'bgp/schemas/updateGrantStatus',
	type: 'object',
	properties: {
		newGrantStatus: { $ref: 'type#/definitions/str' },
	},
	required: ['newGrantStatus'],
};

const personSchema = {
	$id: 'tech.gov.sg/molb/schemas/person',
	type: 'object',
	properties: {
		name: { $ref: 'base#/definitions/str' },
		email: { format: 'email' },
		nric: { $ref: 'common#/definitions/nric' },
		address: {
			$ref: 'address',
		},
		siblings: {
			type: ['array', 'null'],
			items: {
				$ref: 'sibling',
			},
		},
	},
	required: ['name', 'nric'],
};

//const addressSchema = {
//	$id: 'tech.gov.sg/molb/schemas/address',
//	type: 'object',
//	properties: {
//		street: { $ref: 'base#/definitions/str' },
//		unit: { $ref: 'base#/definitions/str' },
//		postal: { type: 'integer', minimum: 100000, maximum: 999999 },
//	},
//};

const siblingSchema = {
	$id: 'tech.gov.sg/molb/schemas/sibling',
	type: 'object',
	properties: {
		name: { $ref: 'base#/definitions/str' },
		nric: { $ref: 'common#/definitions/nric' },
	},
};

const commonSchema = {
	$id: 'tech.gov.sg/molb/schemas/common',
	definitions: {
		nric: { pattern: '^S[0-9]{7}[a-zA-Z]$' },
	},
};

const baseSchema = {
	$id: 'tech.gov.sg/molb/schemas/base',
	definitions: {
		int: { type: 'integer' },
		str: { type: 'string' },
	},
};

exports.validateGrantInfo = ajv
	.addSchema(typeSchema)
	.addSchema(applicationInfoSchema)
	.addSchema(contactInfoSchema)
	.addSchema(addressSchema)
	.addSchema(locationDeployedSchema)
	.addSchema(claimInfoSchema)
	.addSchema(companyGeneralInfoSchema)
	.addSchema(projectInfoSchema)
	.addSchema(costSchema)
	.compile(grantInfoSchema);

exports.validateUpdateGrant = ajv
	.addSchema(updateGrantStatusSchema)
	.addSchema(updateGrantOfficerSchema)
	.compile(updateGrantSchema);
