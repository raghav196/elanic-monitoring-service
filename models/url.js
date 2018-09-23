'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;
const moment = require('moment');
const debug = require('debug')('ELANIC:models/url');

exports.addUrl = (urlObj) => {
	return P.try(() => {
		return db('urls').insert(urlObj, ['*']);
	})
};

exports.updateUrl = (urlId, urlUpdateObj) => {
	return P.try(() => {
		return db('urls').update(urlUpdateObj, ['*']).where({
			_id: urlId
		});
	});
};

exports.getUrlByUrl = (url, urlMethod = null) => {
	return P.try(() => {
		let query = db('urls').where({
			url: url,
			deleted_at: null
		});

		if(urlMethod){
			query = query.where('method', '=', urlMethod)
		}

		return query.select(['*']);
	});
};

exports.getUrls = (options) => {
	return P.try(() => {
		let query = db('urls').where({
			deleted_at: null
		});

		if(options.urlId){
			query = query.where('_id', '=', options.urlId);
		}

		query = query.offset(options.offset || 0).limit(options.limit || 15);

		return query.select(['_id', 'url', 'method', 'data', 'headers']);

	});
};

exports.deleteUrl = (urlId) => {
	return P.try(() => {
		return db('urls').update({
			deleted_at: moment.utc()
		}, ['*']).where({
			_id: urlId
		})
	})
};

exports.getUrlsForMonitoring = () => {
	return P.try(() => {
		return db('urls').select(['_id', 'url', 'method', 'data', 'headers']).where({
			deleted_at: null
		});
	});
};