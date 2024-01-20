import { type Customer } from '../../enterprise/entities/customer'

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>
  findByEmailOrCpf: (email: string, cpf: string) => Promise<Customer | null>
}
