import { RegisterCustomerUseCase } from '@/domain/account/application/usecases/register-customer-use-case'
import { CompanyRepositoryPrisma } from '@/infra/database/prisma/repositories/company-repository-prisma'
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer-repository-prisma'
import { RegisterCustomerController } from './register-customer-controller'

const companyRepository = new CompanyRepositoryPrisma()
const customerRepository = new CustomerRepositoryPrisma()
const usecase = new RegisterCustomerUseCase(customerRepository, companyRepository)
const registerCustomerController = new RegisterCustomerController(usecase)

export { registerCustomerController }
