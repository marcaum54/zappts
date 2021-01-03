'use strict';

/*
|--------------------------------------------------------------------------
| LetterSeed
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class LetterSeed {
  async run() {
    await Factory.model('App/Models/Letter').createMany(50);
  }
}

module.exports = LetterSeed;
