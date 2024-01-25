import request from 'supertest'
import { app } from '@/infra/server'
import { RegisterAccountFixtures } from 'test/fixtures/register-account-fixtures'

describe('[Integration] Register account', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('POST /accounts', async () => {
    const body = RegisterAccountFixtures.makeInput()
    const response = await request(app.server).post('/accounts').send(body)
    expect(response.status).toBe(201)
  })
})
