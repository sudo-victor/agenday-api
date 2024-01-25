import request from 'supertest'
import { app } from '@/infra/server'
import { RegisterColaboratorFixtures } from 'test/fixtures/register-colaborator-fixtures'
import { RegisterAccountFixtures } from 'test/fixtures/register-account-fixtures'

describe('[Integration] Register colaborator', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('POST /colaborators', async () => {
    const companyBody = RegisterAccountFixtures.makeInput()
    const companyResponse = await request(app.server).post('/accounts').send(companyBody)
    const body = RegisterColaboratorFixtures.makeInput()
    const response = await request(app.server).post(`/companies/${companyResponse.body.id}/colaborators`).send(body)
    expect(response.status).toBe(201)
  })
})
