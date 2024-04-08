/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('nest_tables', (table) => {
            table.increments('id').primary(); // Primary key
            table.string('name'); // Name of the listing
            table.string('bed_range'); // Range of beds available
            table.decimal('rent_range', 8, 2); // Rent range, assuming max rent will not exceed 999999.99
            table.json('address').notNullable()
        });
    };

  exports.down = function (knex) {
    return knex.schema.dropTable('nest_tables');
  };