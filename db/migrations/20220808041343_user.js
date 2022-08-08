/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('data_user', function (table) {
    table.primary('user_id');
    table.string('user_id', 25).notNullable();
    table.string('user_name', 80).notNullable();
    table.tinyint('active').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('data_user');
};