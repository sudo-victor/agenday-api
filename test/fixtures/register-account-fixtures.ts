import { faker } from '@faker-js/faker'

interface IMakeInputProps {
  companyName: string
  cnpj: string
  name: string
  cpf: string
  email: string
}

export class RegisterAccountFixtures {
  static makeInput (props: Partial<IMakeInputProps> = {}): IMakeInputProps {
    return {
      companyName: faker.company.name(),
      cnpj: '84.677.626/0001-27',
      name: faker.person.fullName(),
      cpf: '214.336.880-18',
      email: faker.internet.email(),
      ...props
    }
  }
}
