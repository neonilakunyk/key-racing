import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('settings', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unique()
      .notNullable();
    table.integer('seconds_before_game').notNullable().defaultTo(10);
    table.integer('seconds_for_game').notNullable().defaultTo(60);
    table.boolean('is_user_visible_in_rating').notNullable().defaultTo(true);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('settings');
}

export { down, up };
