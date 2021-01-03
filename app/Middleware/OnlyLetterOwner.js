'use strict';

const model = use('App/Models/Letter');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class OnlyLetterOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    const authed = await auth.getUser();
    const letter = await model.findByOrFail('uuid', request.params.id);

    if (letter.owner_id !== authed.$originalAttributes.id) {
      return response.status(403).send('You cannot change a letter that is not yours');
    }

    await next();
  }
}

module.exports = OnlyLetterOwner;
