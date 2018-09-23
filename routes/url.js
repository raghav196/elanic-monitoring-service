'use strict';

const P = require('bluebird');
const _ = require('lodash');

const urlController = require('../controllers/url');

const validation = require('../utils/validation');
const error = require('../utils/error');
const response = require('../utils/response');

module.exports = (router) => {

	router.post('/monitors', (req, res) => {
		return P.try(() => {
			if(!validation.URLS.postMonitorURL(req.body)){
				throw validation.constructError(validation.URLS.postMonitorURL);
			}

			return urlController.addMonitoringUrl(req);
		}).then((data) => {
			return response.sendResponse(req, res, 201, data);
		});
	});

	router.put('/monitors/:url_id', (req, res) => {
		return P.try(() => {
			if(!validation.URLS.putMonitorURL(req.body)){
				throw validation.constructError(validation.URLS.putMonitorURL);
			}

			return urlController.updateMonitoringUrl(req);
		}).then((data) => {
			return response.sendResponse(req, res, 201, data);
		});
	});

	router.get('/monitors/:url_id', (req, res) => {
		return P.try(() => {
			return urlController.getMonitoringUrl(req);
		}).then((data) => {
			return response.sendResponse(req, res, 200, data);
		})
	});

	router.get('/monitors', (req, res) => {
		return P.try(() => {
			if(!validation.URLS.getMonitorURLs(req.query)){
				throw validation.constructError(validation.URLS.getMonitorURLs);
			}

			return urlController.getMonitoringUrlList(req);
		}).then((data) => {
			// return res.status(200).json({
			// 	success: true,
			// 	data: data
			// });
			return response.sendResponse(req, res, 200, data);
		});
	});


	router.delete('/monitors/:url_id', (req, res) => {
		return P.try(() => {
			return urlController.deleteMonitoringUrl(req);
		}).then(() => {
			// return res.status(200).json({
			// 	success: true
			// });
			return response.sendResponse(req, res);
		});
	});
};