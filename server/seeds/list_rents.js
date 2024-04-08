/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



const listingData = require('../listings-data/listings');


exports.seed = async function(knex) {
  await knex('nest_tables').del();
  await knex('nest_tables').insert(listingData);
};