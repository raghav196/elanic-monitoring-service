'use strict';

const P = require('bluebird');
const _ = require('lodash');
const debug = require('debug')('ELANIC:controllers/url');

const Url = require('../models/url');
const UrlResponse = require('../models/urlResponse');

const error = require('../utils/error');
const helper = require('../utils/helper');

exports.addMonitoringUrl = (req) => {
	return P.try(() => {

		if(req.body.method !== 'get' && !req.body.data){
			throw error._400(`'data' field missing`);
		}

		return Url.getUrlByUrl(req.body.url, req.body.method);
	}).then((url) => {
		if(!_.isEmpty(url)){
			throw error._409(`URL '${req.body.method.toUpperCase()} ${req.body.url} already exists.`);
		}

		return Url.addUrl(req.body);
	}).then((urlInserted) => {
		// if(_.isEmpty(urlInserted)){
		// 	debug(urlInserted);
		// 	throw error._500();
		// }
		return { _id: urlInserted[0]._id };
	})
};

exports.updateMonitoringUrl = (req) => {
	return P.try(() => {
		return Url.getUrls({
			urlId: req.params.url_id
		})
	}).then((url) => {
		if(_.isEmpty(url)){
			throw error._404('Url not found');
		}

		return Url.updateUrl(req.params.url_id, req.body);
	}).then(() => {
		return { _id: req.params.url_id };
	})
};

exports.getMonitoringUrl = (req) => {
	return P.try(() => {
		return Url.getUrls({
			urlId: req.params.url_id
		});
	}).then((url) => {
		if (_.isEmpty(url)) {
			throw error._404('Url not found');
		}

		return P.try(() => {
			return UrlResponse.getUrlResponse(req.params.url_id);
		}).then((urlResponseData) => {

			const responseTimes = _.map(urlResponseData, (e) => {
				return e.response_time_in_ms;
			});

			debug('RESPONSE TIMES');
			debug(responseTimes);
			debug(urlResponseData);

			const responses = _.slice(responseTimes, 0, 100);

			const percentileData = _.sortBy(responseTimes);

			debug(responses);
			debug(percentileData);

			const percentile_50th = helper.calculateNthPercentile(percentileData, 50);
			const percentile_75th = helper.calculateNthPercentile(percentileData, 75);
			const percentile_95th = helper.calculateNthPercentile(percentileData, 95);
			const percentile_99th = helper.calculateNthPercentile(percentileData, 99);



			let response = _.pick(url[0], ['_id', 'url', 'method', 'data', 'headers']);

			console.log(response);
			response = _.extend(response, {
				responses: responses,
				'50th_percentile': percentile_50th,
				'75th_percentile': percentile_75th,
				'95th_percentile': percentile_95th,
				'99th_percentile': percentile_99th,
			});

			return response;

		});
	})
};

exports.getMonitoringUrlList = (req) => {
	return P.try(() => {
		return Url.getUrls(req.query);
	}).then((urls) => {
		return {
			urls: urls
		};
	});
};

exports.deleteMonitoringUrl = (req) => {
	return P.try(() => {
		return Url.getUrls({
			urlId: req.params.url_id
		})
	}).then((url) => {
		if(_.isEmpty(url)){
			throw error._404('Url not found');
		}
		return Url.deleteUrl(req.params.url_id);
	});
};