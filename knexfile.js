'use strict';

let config = require('./configs/config');


// Update with your config settings.

module.exports = {
	client: 'postgresql',
	connection: {
		host: config.DATABASE.HOST,
		port: config.DATABASE.PORT,
		database: config.DATABASE.DATABASE,
		user: config.DATABASE.USER,
		password: config.DATABASE.PASSWORD,
	},
	pool: {
		min: 2,
		max: 20
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
