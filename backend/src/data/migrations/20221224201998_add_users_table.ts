import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('full_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password');
    table.string('photo_url');
    table.integer('record').notNullable().defaultTo(0);
    table.integer('current_room_id').references('id').inTable('rooms');
    table.integer('personal_room_id').references('id').inTable('rooms').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

export { down, up };
