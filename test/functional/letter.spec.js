'use strict';

const { test, trait, before } = use('Test/Suite')('Letter');

const Env = use('Env');

const model = use('App/Models/Letter');

const axios = use('axios');

trait('Test/ApiClient');

let token;
let owner_id;
let created;

const uuid = 'c6d2666c-151c-4ea6-aa6d-8ff55f742148';

before(async () => {
  const response = await axios.post(`http://${Env.get('HOST')}:${Env.get('PORT')}/authenticate`, {
    username: 'good-child',
    password: '123123123',
  });

  owner_id = response.data.user.id;
  token = `Bearer ${response.data.token}`;
});

test('Should LIST a letters', async ({ client, assert }) => {
  const response = await client.get(`/letters/`).header('Authorization', token).end();

  response.assertStatus(200);
  assert.equal(response.body.data[0].id, 50);
  assert.equal(response.body.data[19].id, 31);
});

test('Should CREATE a letter', async ({ client }) => {
  const data = {
    uuid,
    owner_id,
    title: 'Lorem Ipsum',
    body: 'Dolor sit amet, consectetur adipiscing elit.',
  };

  created = await client.post('/letters').header('Authorization', token).send(data).end();

  created.assertStatus(200);
  created.assertJSONSubset({ ...data });
});

test('Should UPDATE a letter', async ({ client }) => {
  const data = {
    title: 'Updated - Lorem Ipsum',
    body: 'Updated - Dolor sit amet, consectetur adipiscing elit.',
  };

  const updated = await client.put(`/letters/${created.body.uuid}`).header('Authorization', token).send(data).end();
  updated.assertStatus(200);
  updated.assertJSONSubset({ ...data });
});

test("Shouldn't UPDATE a letter from another child", async ({ client }) => {
  const auth_another = await client.post('/authenticate').send({ username: 'bad-child', password: '123123123' }).end();

  const response = await client
    .put(`/letters/${uuid}`)
    .header('Authorization', `Bearer ${auth_another.body.token}`)
    .send({ title: 'aaa', body: 'aaa' })
    .end();

  response.assertStatus(403);
  response.assertText('You cannot change a letter that is not yours');
});

test("Shouldn't Santa Claus Create a Letter", async ({ client }) => {
  const auth_santa = await client.post('/authenticate').send({ username: 'santa-claus', password: '123123123' }).end();

  const response = await client
    .post(`/letters`)
    .header('Authorization', `Bearer ${auth_santa.body.token}`)
    .send({
      title: 'aaa',
      body: 'aaa',
    })
    .end();

  response.assertStatus(403);
  response.assertText("Santa Claus can't write a Letter for yourself");
});

test('Should SHOW a letter', async ({ client }) => {
  const updated = await client.get(`/letters/${created.body.uuid}`).header('Authorization', token).end();
  updated.assertStatus(200);
});

test('Should DELETE a letter', async ({ client }) => {
  const updated = await client.delete(`/letters/${created.body.uuid}`).header('Authorization', token).end();
  updated.assertStatus(204);
});

test("Shouldn't create an empty letter", async ({ client }) => {
  const response = await client.post('/letters').header('Authorization', token).send({}).end();
  response.assertStatus(400);
});

test('Should require authentication to list the letters', async ({ client }) => {
  const response = await client.get('/letters').end();
  response.assertStatus(401);
});
