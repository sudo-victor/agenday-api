import { Colaborator } from '@/domain/account/enterprise/entities/colaborator'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export class ColaboratorFixtures {
  static makeEntity (): Colaborator {
    return Colaborator.create({
      companyId: randomUUID(),
      name: faker.person.fullName(),
      cpf: '214.336.880-18',
      email: faker.internet.email()
    })
  }
}
