import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'

import supertest from 'supertest'
import { factory, faker } from '../utils/factories'

const BASE_URL = 'http://localhost:4000'

import Level from 'App/Models/Level'
import Developer from 'App/Models/Developer'

test.group('Developer', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should be able to insert a developer', async (assert) => {
    const level = await factory.create('Level')
    const levelId = level.level_id
    const developerName = faker.name.findName()
    const gender = Math.ceil(Math.random() * 2) === 1 ? 'f' : 'm'
    const birthday = faker.date.past()
    const hobby = faker.word.verb()
    const response = await supertest(BASE_URL)
      .post('/developer')
      .send({ level_id: levelId, developer_name: developerName, gender, birthday, hobby })
    assert.equal(response.status, 201)
    assert.hasAnyKeys(response.body, ['data'])
    assert.hasAnyKeys(response.body.data, ['developer_id'])
    const developer = await Developer.query()
      .where({ developer_id: response.body.data.developer_id })
      .first()
    assert.equal(!!developer, true)
    assert.equal(developer?.developer_name, developerName)
    assert.equal(developer?.gender, gender)
    assert.equal(developer?.hobby, hobby)
  })

  test('It should be able to update a developer', async (assert) => {
    const level = await Level.create({ level_name: 'Nível 1' })
    const developer = await Developer.create({
      level_id: level.level_id,
      developer_name: faker.name.findName(),
      gender: 'f',
      birthday: faker.date.past(),
      hobby: faker.word.verb(),
    })
    const newGender = 'm';
    const newDeveloperName = faker.name.findName() + ' - atualizado'
    const response = await supertest(BASE_URL)
      .put(`/developer/${developer.developer_id}`)
      .send({ developer_name: newDeveloperName, gender: newGender })
    assert.equal(response.status, 200)
    assert.hasAnyKeys(response.body, ['data'])
    assert.hasAnyKeys(response.body.data, ['developer_id'])
    const developerUpdated = await Developer.query().where({ developer_id: developer.developer_id }).first()
    assert.equal(!!developerUpdated, true)
    assert.equal(developerUpdated?.developer_name, newDeveloperName)
    assert.equal(developerUpdated?.gender, newGender)
    assert.equal(developerUpdated?.hobby, developer.hobby)
  })

  test('It should be able to remove a developer', async (assert) => {
    const level = await Level.create({ level_name: 'Nível 1' })
    const developer = await Developer.create({
      level_id: level.level_id,
      developer_name: faker.name.findName(),
      gender: 'f',
      birthday: faker.date.past(),
      hobby: faker.word.verb(),
    })
    const response = await supertest(BASE_URL).delete(`/developer/${developer.developer_id}`)
    assert.equal(response.status, 204)
    const dev = await Developer.find(developer.developer_id)
    assert.equal(!!dev, false)
  })
})
