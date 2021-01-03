'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return 'Zappts API: Online';
}).as('home');

Route.post('authenticate', 'AuthController.authenticate').as('authenticate');
Route.post('current-user', 'AuthController.current_user').as('current-user');

Route.group(() => {
  Route.get('letters', 'LetterController.index').as('letters.index');
  Route.get('letters/:id', 'LetterController.show').as('letters.show');
}).middleware(['auth:jwt']);

Route.group(() => {
  Route.put('letters/:id', 'LetterController.update').as('letters.update').validator('LetterStore');
  Route.delete('letters/:id', 'LetterController.destroy').as('letters.destroy');
}).middleware(['auth:jwt', 'notSantaClaus', 'OnlyLetterOwner']);

Route.group(() => {
  Route.post('letters', 'LetterController.store').as('letters.store').validator('LetterStore');
}).middleware(['auth:jwt', 'notSantaClaus']);
