'use strict';

const constants = require('../configs/constants');

exports.postMonitorURL = {
	type: 'object',
	properties: {
		url: {
			type: 'string',
			format: 'uri'
		},
		method: {
			type: 'string',
			transform: ['trim','toLowerCase'],
			enum: constants.URL.VERBS
		},
		data: {
			type: 'object',
			minProperties: 1
		},
		headers: {
			type: 'object',
			minProperties: 1
		}
	},
	required: ['url', 'method', 'headers'],
	additionalProperties: false
};

exports.putMonitorURL = {
	type: 'object',
	properties: {
		// url: {
		// 	type: 'string',
		// 	format: 'uri'
		// },
		// method: {
		// 	type: 'string',
		// 	transform: ['trim','toLowerCase'],
		// 	enum: constants.URL.VERBS
		// },
		data: {
			type: 'object',
			minProperties: 1
		},
		headers: {
			type: 'object',
			minProperties: 1
		}
	},
	minProperties: 1,
	additionalProperties: false
};

exports.getMonitorURLs = {
	type: 'object',
	properties: {
		offset: {
			type: 'number',
			minimum: 0
		},
		limit: {
			type: 'number',
			minimum: 1,
			maximum: 15
		}
	},
	additionalProperties: false
};