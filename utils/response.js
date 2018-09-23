'use strict';

const _ = require('lodash');

exports.sendResponse = (req, res, status = 200, data = null) => {

	let response = {
		success: true
	};

	response = _.extend(response, data);

	return res.status(status).json(response);


};