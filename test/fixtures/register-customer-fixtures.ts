import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

interface MakeInputProps {
  companyId: string
  name: string
  cpf: string
  email: string
  phone: string
}

export class RegisterCustomerFixtures {
  static makeInput (props: Partial<MakeInputProps> = {}): MakeInputProps {
    return {
      companyId: randomUUID(),
      name: faker.person.fullName(),
      cpf: '214.336.880-18',
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ...props
    }
  }
}
