import request from 'supertest'
import { faker } from '@faker-js/faker'
import { app } from '@/infra/server'

describe('[Integration] Register account', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('POST /register-account', async () => {
    const body = {
      name: 'Victor Soares',
      companyName: 'VSS',
      cnpj: '81.447.029/0001-18',
      cpf: '182.028.137-00',
      email: faker.internet.email()
    }
    const response = await request(app.server).post('/register-account').send(body)
    expect(response.status).toBe(201)
  })
})
