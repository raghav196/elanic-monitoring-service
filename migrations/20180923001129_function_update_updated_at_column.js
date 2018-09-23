'use strict';

exports.up = async (knex) => {
	await knex.raw('CREATE OR REPLACE FUNCTION update_updated_at_column()\n' +
		'RETURNS TRIGGER AS $$\n' +
		'BEGIN\n' +
		'IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN\n' +
		'NEW.updated_at = now();\n' +
		'END IF;\n' +
		'RETURN NEW;\n' +
		'END;\n' +
		'$$ language \'plpgsql\';');
};

exports.down = async (knex) => {
	await knex.raw('DROP FUNCTION IF EXISTS update_updated_at_column();');
};