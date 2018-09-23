'use strict';

const _ = require('lodash');

exports.reflect = (promise) => {
	return promise.then((resolve) => {
		return {
			resolve: resolve,
			status: 'resolved'
		};
	}, (reject) => {
		return {
			resolve: reject,
			status: 'rejected'
		};
	})
};

/**
 *
 * @param sortedData
 * @param n
 * @returns {*}
 *
 * Used the nearest rank method. Refer - https://en.wikipedia.org/wiki/Percentile
 */
exports.calculateNthPercentile = (sortedData, n) => {

	// data = _.sortBy(data);
	const index = _.ceil(n/100 * sortedData.length);
	return sortedData[index - 1];

};