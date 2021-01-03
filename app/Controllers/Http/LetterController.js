'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Letter = use('App/Models/Letter');

class LetterController {
  async index({ request }) {
    return await Letter.query()
      .orderBy('id', request.qs.order || 'desc')
      .paginate(request.qs.page || 1);
  }

  async store({ request, auth }) {
    const user = await auth.getUser();
    const data = Object.assign({}, request.only(['uuid', 'title', 'body']), { owner_id: user.id });
    return await Letter.create(data);
  }

  async show({ params }) {
    return await Letter.findByOrFail('uuid', params.id);
  }

  async update({ params, request }) {
    const row = await Letter.findByOrFail('uuid', params.id);

    row.merge(request.only(['title', 'body']));
    row.save();

    return row;
  }

  async destroy({ params }) {
    const row = await Letter.findByOrFail('uuid', params.id);
    await row.delete();
  }
}

module.exports = LetterController;
