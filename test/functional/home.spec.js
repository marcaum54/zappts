'use strict';

const { test, trait } = use('Test/Suite')('Home');

trait('Test/ApiClient');

test('A aplicação deveria estar Onlinme', async ({ client }) => {
  const response = await client.get('/').end();
  response.assertStatus(200);
});
