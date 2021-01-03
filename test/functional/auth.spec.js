'use strict';

const { test, trait, before } = use('Test/Suite')('Auth');

const Env = use('Env');

const model = use('App/Models/Letter');

trait('Test/ApiClient');

test('Should show the current user', async ({ client }) => {
  const auth = await client
    .post('/authenticate')
    .send({
      username: 'santa-claus',
      password: '123123123',
    })
    .end();

  const response = await client.post('/current-user').header('Authorization', `Bearer: ${auth.body.token}`).end();

  response.assertStatus(200);
});

test('Should not allow user with wrong login or password', async ({ client }) => {
  const auth = await client
    .post('/authenticate')
    .send({
      username: 'asdasdasdad',
      password: '234fasasdcfs',
    })
    .end();

  auth.assertStatus(401);
});
