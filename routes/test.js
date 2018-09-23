'use strict';

const P = require('bluebird');
const _ = require('lodash');

const urlController = require('../controllers/url');

const validation = require('../utils/validation');
const error = require('../utils/error');

module.exports = (router) => {

	router.get('/test', (req, res) => {
		return P.try(() => {
			return res.status(200).json({
				success: true
			})
		})
	});

	router.post('/test', (req, res) => {
		return P.try(() => {
			return res.status(200).json({
				success: true,
				data: req.body
			});
		});
	});


};