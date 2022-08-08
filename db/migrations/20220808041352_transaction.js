/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('data_transaction', function (table) {
        table.bigIncrements('trans_id', { primaryKey: true });
        table.timestamp('trans_date').notNullable();
        table.foreign('user_id').references('data_user.user_id');
        table.string('user_id', 25).notNullable();
        table.foreign('product_id').references('data_product.product_id');
        table.integer('product_id').unsigned().notNullable();
        table.integer('qty_order').notNullable();
        table.float('total_order').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('data_transaction');
};
  