
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
       table.increments('id').primary()
       table.string('email', 255).notNullable().unique()
       table.string('username', 255).notNullable().unique()
       table.string('first_name', 255).notNullable()
       table.string('last_name', 255).notNullable()
       table.string('password', 255).notNullable()
       table.boolean('isVerified').notNullable().defaultTo(0)
    })
};

exports.down = function(knex) {
  
};
