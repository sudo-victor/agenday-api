import { RegisterCustomerUseCase } from './register-customer-use-case'
import { CustomerRepositoryInMemory } from 'test/in-memory/customer-repository-in-memory'
import { CompanyRepositoryInMemory } from 'test/in-memory/company-repository-in-memory'
import { CompanyFixtures } from 'test/fixtures/company-fixtures'
import { RegisterCustomerFixtures } from 'test/fixtures/register-customer-fixtures'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { CustomerFixtures } from 'test/fixtures/customer-fixtures'
import { CustomerAlreadyRegisteredError } from '@/core/usecases/errors/customer-already-registered-error'

let companyRepository: CompanyRepositoryInMemory
let customerRepository: CustomerRepositoryInMemory
let sut: RegisterCustomerUseCase

describe('[Use Case] Register customer use case', () => {
  beforeEach(() => {
    companyRepository = new CompanyRepositoryInMemory()
    customerRepository = new CustomerRepositoryInMemory()
    sut = new RegisterCustomerUseCase(customerRepository, companyRepository)
  })

  it('should be able to register a customer', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const input = RegisterCustomerFixtures.makeInput({ companyId: company.id.toValue() })
    await sut.execute(input)
    const customerPersisted = customerRepository.items[0]
    expect(customerPersisted.id.toValue()).toBeDefined()
    expect(customerPersisted.cpf.toValue()).toBe('21433688018')
    expect(customerPersisted.email).toBe(input.email)
  })

  it('should not be able to register a customer with invalid company id', async () => {
    const input = RegisterCustomerFixtures.makeInput()
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CompanyNotFoundError)
  })

  it('should not be able to register a customer with cpf already registered', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const customer = CustomerFixtures.makeEntity()
    await customerRepository.save(customer)
    const input = RegisterCustomerFixtures.makeInput({ companyId: company.id.toValue(), cpf: customer.cpf.toValue() })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CustomerAlreadyRegisteredError)
  })

  it('should not be able to register a customer with email already registered', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const customer = CustomerFixtures.makeEntity()
    await customerRepository.save(customer)
    const input = RegisterCustomerFixtures.makeInput({ companyId: company.id.toValue(), cpf: '670.944.160-16', email: customer.email })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CustomerAlreadyRegisteredError)
  })
})
