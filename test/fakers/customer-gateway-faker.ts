import { type CustomerGatewayResponse, type CustomerGateway } from '@/domain/appointment/application/gateways/customer-gateway'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export class CustomerGatewayFaker implements CustomerGateway {
  async getById (id: string): Promise<CustomerGatewayResponse | null> {
    return {
      id: randomUUID(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      cpf: '214.336.880-18'
    }
  }
}
