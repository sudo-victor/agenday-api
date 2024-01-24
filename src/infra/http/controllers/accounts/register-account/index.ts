import { RegisterAccountUseCase } from '@/domain/account/application/usecases/register-account-use-case'
import { RegisterAccountController } from './register-account-controller'
import { AdminRepositoryPrisma } from '@/infra/database/prisma/repositories/admin-repository-prisma'
import { CompanyRepositoryPrisma } from '@/infra/database/prisma/repositories/company-repository-prisma'

const adminRepository = new AdminRepositoryPrisma()
const companyRepository = new CompanyRepositoryPrisma()
const usecase = new RegisterAccountUseCase(adminRepository, companyRepository)
export const registerAccountController = new RegisterAccountController(usecase)
