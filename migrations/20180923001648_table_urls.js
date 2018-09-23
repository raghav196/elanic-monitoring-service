'use strict';

exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('urls', (table) => {
  	table.increments('_id');
  	table.string('url').notNullable();
  	table.string('method').notNullable();
  	table.jsonb('data');
  	table.jsonb('headers');
		table.timestamp('deleted_at').defaultTo(null);
		table.timestamp('created_at', false).defaultTo(knex.fn.now());
		table.timestamp('updated_at', false).defaultTo(knex.fn.now());
		table.unique(['url', 'deleted_at']);
		table.unique(['url', 'method']);
	})
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('urls');
};
