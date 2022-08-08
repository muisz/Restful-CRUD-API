/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('data_product', function (table) {
        table.primary('product_id');
        table.increments('product_id');
        table.string('product_name', 80).notNullable();
        table.float('premium').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('data_product');
};
