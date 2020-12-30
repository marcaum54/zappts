'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const uuidv4 = require('uuid/v4');

class Letter extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', async (instance) => {
      if (!instance.uuid) {
        instance.uuid = uuidv4();
      }
    });
  }
}

module.exports = Letter;
