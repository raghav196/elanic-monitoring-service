'use strict';

const P = require('bluebird');
const _ = require('lodash');
const rp = require('request-promise');
const axios = require('axios');
const moment = require('moment');
const debug = require('debug')('ELANIC:utils/monitorUrl');

// exports.monitorUrl = (urlObj) => {
// 	return P.try(() => {
// 		const options = {
// 			method: urlObj.method,
// 			uri: urlObj.url,
// 			headers: urlObj.headers,
// 			json: true
// 		};
//
// 		if(urlObj.data){
// 			options.body = urlObj.data
// 		}
// 		return rp(options);
// 	})
// };

exports.monitorUrl = (urlObj) => {
	return P.try(() => {

		debug('URL OBJECT');
		debug(urlObj);
		const options = {
			method: urlObj.method,
			url: urlObj.url,
			headers: urlObj.headers,
			config: {
				startTime: moment().valueOf()
			}
		};

		if(urlObj.data){
			options.data = urlObj.data
		}

		debug('OPTIONS');
		debug(options);
		return axios(options);
	}).then((reply) => {
		return {
			status_code: reply.status,
			response_time: moment().valueOf() - reply.config.config.startTime,
			response: reply.data
		};
	}).catch((err) => {
		return {
			status_code: err.response.status,
			response_time: moment().valueOf() - err.response.config.config.startTime,
			response: err.response.data
		};
	});
};