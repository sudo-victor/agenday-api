import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { type CustomerRepository } from '../repositories/customer-repository'
import { type CompanyRepository } from '../repositories/company-repository'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerAlreadyRegisteredError } from '@/core/usecases/errors/customer-already-registered-error'

export class RegisterCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const company = await this.companyRepository.findById(input.companyId)
    if (!company) throw new CompanyNotFoundError()
    const customerAlreadyExists = await this.customerRepository.findByEmailOrCpf(input.email, input.cpf)
    if (customerAlreadyExists) throw new CustomerAlreadyRegisteredError()
    const customer = Customer.create({ ...input })
    await this.customerRepository.save(customer)
  }
}

interface Input {
  companyId: string
  name: string
  cpf: string
  phone: string
  email: string
}
