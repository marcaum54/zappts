'use strict';

/*
|--------------------------------------------------------------------------
| UserSeed
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Model = use('App/Models/User');

class UserSeed {
  async run() {
    const users = [
      {
        email: 'santa-claus@rourourou.com',
        username: 'Santa Claus',
      },
      {
        email: 'good-child@example.com',
        username: 'good-child',
      },
      {
        email: 'bad-child@example.com',
        username: 'bad-child',
      },
    ];

    const promises = users.map(async (user) => {
      user.password = '123123123';
      await Model.create(user);
    });

    await Promise.all(promises);
  }
}

module.exports = UserSeed;
