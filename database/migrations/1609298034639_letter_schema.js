'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LetterSchema extends Schema {
  up() {
    this.create('letters', (table) => {
      table.increments();

      table.uuid('uuid');

      table.integer('owner_id').unsigned().index().notNullable();
      table.foreign('owner_id').references('id').on('users');

      table.string('title').notNullable();
      table.text('body').notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('letters');
  }
}

module.exports = LetterSchema;
