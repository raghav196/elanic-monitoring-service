'use strict';

exports.up = async (knex, Promise) => {
	await Promise.all([
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON urls FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON url_responses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
	]);
};

exports.down = async (knex, Promise) => {
	await Promise.all([
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON urls'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON url_responses')
	]);
};
