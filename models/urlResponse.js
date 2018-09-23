'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;

exports.addUrlResponse = (urlResponses) => {
	return P.try(() => {
		return db('url_responses').insert(urlResponses);
	});
};

exports.getUrlResponse = (urlId) => {
	return P.try(() => {
		let query = db('urls').leftJoin('url_responses', function(){
			this.on('urls._id', '=', 'url_responses.url_id');
		}).where('urls._id', '=', urlId);

		return query.select([
			'urls._id',
			'urls.url',
			'urls.data',
			'urls.headers',
			'url_responses.response_time_in_ms'
		]).orderBy('url_responses.created_at', 'desc');
	});
};

