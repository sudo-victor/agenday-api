import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { DocumentFaker } from 'test/fakers/document-faker'

interface MakeInputProps {
  companyId: string
  name: string
  phone: string
  cpf: string
  email: string
}

export class RegisterColaboratorFixtures {
  static makeInput (props: Partial<MakeInputProps> = {}): MakeInputProps {
    return {
      companyId: randomUUID(),
      name: faker.person.fullName(),
      cpf: DocumentFaker.cpf(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ...props
    }
  }
}
