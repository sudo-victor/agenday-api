import { UniqueId } from '@/core/domain/unique-id'
import { Company } from '@/domain/account/enterprise/entities/company'
import { faker } from '@faker-js/faker'

export class CompanyFixtures {
  static makeEntity (): Company {
    return Company.create({ name: faker.company.name(), cnpj: '84.677.626/0001-27', ownerId: new UniqueId() })
  }
}
