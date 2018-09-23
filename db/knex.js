'use strict';

let environment = process.env.NODE_ENV || 'development';
let config = require('../knexfile.js');

let knex = require('knex');
let knexPostgis = require('knex-postgis');
let types = require('pg').types;
let moment = require('moment');

const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
const DATE = 1082;
const NUMERIC = 1700;

const parseTimestamp = (val) => {
	return val === null ? null : moment.utc(val).toISOString();
};

const parseNumeric = (val) => {
	return Number(val);
};

// types.setTypeParser(TIMESTAMPTZ_OID, parseTimestamp);
// types.setTypeParser(TIMESTAMP_OID, parseTimestamp);
types.setTypeParser(NUMERIC, parseNumeric);
// types.setTypeParser(DATE, 'text');


let db = knex(config);
let st = knexPostgis(db);

module.exports = {
	db: db,
	st: st
};