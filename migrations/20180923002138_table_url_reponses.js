'use strict';

exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('url_responses', (table) => {
  	table.increments('id');
  	table.integer('url_id').references('_id').inTable('urls')
			.notNullable()
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
  	table.text('response');
  	table.string('status_code');
  	table.specificType('response_time_in_ms', 'numeric').notNullable();
		table.timestamp('created_at', false).defaultTo(knex.fn.now());
		table.timestamp('updated_at', false).defaultTo(knex.fn.now());
	})
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('url_responses');
};
