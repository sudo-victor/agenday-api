import { Customer } from '@/domain/account/enterprise/entities/customer'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export class CustomerFixtures {
  static makeEntity (): Customer {
    return Customer.create({
      companyId: randomUUID(),
      name: faker.person.fullName(),
      cpf: '214.336.880-18',
      email: faker.internet.email(),
      phone: faker.phone.number()
    })
  }
}
