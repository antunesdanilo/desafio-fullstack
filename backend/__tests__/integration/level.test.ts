import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'

import supertest from 'supertest'
import { faker } from '../utils/factories'

const BASE_URL = 'http://localhost:4000'

import Level from 'App/Models/Level'
import Developer from 'App/Models/Developer'

test.group('Level', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('It should be able to insert a level', async (assert) => {
    const levelName = 'Nível 1'
    const response = await supertest(BASE_URL).post('/level').send({ level_name: levelName })
    assert.equal(response.status, 201)
    assert.hasAnyKeys(response.body, ['data'])
    assert.hasAnyKeys(response.body.data, ['level_id'])
    const level = await Level.query().where({ level_id: response.body.data.level_id }).first()
    assert.equal(!!level, true)
    assert.equal(level?.level_name, levelName)
  })

  test('It should be able to update a level', async (assert) => {
    const level = await Level.create({level_name: 'Nível 1'})
    const newLevelName = 'Nível 1 - atualizado'
    const response = await supertest(BASE_URL).put(`/level/${level.level_id}`).send({ level_name: newLevelName })
    assert.equal(response.status, 200)
    assert.hasAnyKeys(response.body, ['data'])
    assert.hasAnyKeys(response.body.data, ['level_id'])
    const levelUpdated = await Level.query().where({ level_id: level.level_id }).first()
    assert.equal(!!levelUpdated, true)
    assert.equal(levelUpdated?.level_name, newLevelName)
  })

  test('It should not be possible to remove a level if there is an associated developer', async (assert) => {
    const level = await Level.create({ level_name: 'Nível 1' })
    await Developer.create({
      level_id: level.level_id,
      developer_name: faker.name.findName(),
      gender: Math.ceil(Math.random() * 2) === 1 ? 'f' : 'm',
      birthday: faker.date.past(),
      hobby: faker.word.verb(),
    })
    const response = await supertest(BASE_URL).delete(`/level/${level.level_id}`)
    assert.equal(response.status, 501)
    const lev = await Level.find(level.level_id)
    assert.equal(!!lev, true)
  })

  test('It should be able do remove a empty level', async (assert) => {
    const level = await Level.create({ level_name: 'Nível 1' })
    const response = await supertest(BASE_URL).delete(`/level/${level.level_id}`)
    assert.equal(response.status, 204)
    const lev = await Level.find(level.level_id)
    assert.equal(!!lev, false)
  })
})
