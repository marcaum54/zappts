'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LetterSchema extends Schema {
  up() {
    this.create('letters', (table) => {
      table.increments();

      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users');

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
