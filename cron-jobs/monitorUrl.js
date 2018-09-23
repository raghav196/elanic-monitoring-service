'use strict';

const P = require('bluebird');
const _ = require('lodash');
const CronJob = require('cron').CronJob;
const debug = require('debug')('ELANIC:cron-jobs/monitorUrl');
const util = require('util');

const Url = require('../models/url');
const UrlResponse = require('../models/urlResponse');

const helper = require('../utils/helper');
const monitorUrlUtil = require('../utils/monitorUrl');

const monitorUrl = {};

monitorUrl.monitorUrlCronJob = function(){
	console.log('asdasd');
	return new CronJob({
		cronTime: '* * * * * *',
		onTick: function(){
			/*
			 * Runs every second
			 * Fetch urls and hit them.
			 */
			debug('CRON RUNNING');
			return P.try(() => {
				return Url.getUrlsForMonitoring();
			}).then((urls) => {

				debug('URLS');
				debug(urls);
				const hitUrls = _.map(urls, (e) => {
					return monitorUrlUtil.monitorUrl(_.pick(e, ['url', 'method', 'headers', 'data']))
				});

				return P.try(() => { return P.all(hitUrls);/*return P.all(_.map(hitUrls, helper.reflect));*/ }).then((monitorUrlsResult) => {
					debug('monitorUrlResult');
					debug(util.inspect(monitorUrlsResult, false, null));

					const urlResponses = _.map(monitorUrlsResult, (e, idx) => {
						return {
							url_id: urls[idx]._id,
							response: e.response,
							response_time_in_ms: e.response_time,
							status_code: e.status_code
						};
					});

					debug('URL RESPONSES');
					debug(urlResponses);

					return UrlResponse.addUrlResponse(urlResponses);


				});

			});

		},
		start: false,
		timeZone: 'UTC'
	});
};

// monitorUrl.monitorUrlCronJob().start();


monitorUrl.monitorUrlsCron = () => {
	console.log('STARTING MONITORING OF URLs');
	monitorUrl.monitorUrlCronJob().start();
	console.log('MONITORING STARTED');
};

module.exports = monitorUrl;
