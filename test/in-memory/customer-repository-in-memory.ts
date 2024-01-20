import { type CustomerRepository } from '@/domain/account/application/repositories/customer-repository'
import { type Customer } from '@/domain/account/enterprise/entities/customer'
import { Cpf } from '@/domain/account/enterprise/value-objects/cpf'

export class CustomerRepositoryInMemory implements CustomerRepository {
  items: Customer[] = []

  async save (customer: Customer): Promise<void> {
    this.items.push(customer)
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email || item.cpf.isEqual(Cpf.create(cpf)))
    return !customer ? null : customer
  }
}
