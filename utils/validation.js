'use strict';

const Ajv = require('ajv');

const error = require('./error');

const urlSchema = require('../schema/url');

const ajv = new Ajv({
	coerceTypes: true,
	format: 'full',
	verbose: true,
	removeAdditional: true
});

require('ajv-keywords')(ajv, ['transform']);

const validation = {};

validation.constructError = function(errors){
	console.log(errors);
	const err = errors.errors[0];
	console.log(err);
	const dataPath = err.dataPath.replace('.', '');
	const errMessage = err.message;
	const message = `${dataPath} ${errMessage}`;

	return error._400(message.trim());
};

validation.URLS = {
	postMonitorURL: ajv.compile(urlSchema.postMonitorURL),
	putMonitorURL: ajv.compile(urlSchema.putMonitorURL),
	getMonitorURLs: ajv.compile(urlSchema.getMonitorURLs)
};



module.exports = validation;