'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotSantaClaus {
  async handle({ response, auth }, next) {
    const authed = await auth.getUser();

    if (authed.$originalAttributes.username === 'santa-claus') {
      return response.status(403).send(`Santa Claus can't write a Letter for yourself`);
    }

    await next();
  }
}

module.exports = NotSantaClaus;
