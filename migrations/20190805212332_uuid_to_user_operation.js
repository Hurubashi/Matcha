
exports.up = function(knex) {
	return knex.schema
		.createTable('uuid_to_operation', function (table) {
			table.increments('user_id').index('user_id_idx')
			table.string('uuid', 255).notNullable()
			table.enum('operation', ['email confirmation', 'password change'])
		})
};

exports.down = function(knex) {
	return knex.schema.dropTable('uuid_to_operation')
};
