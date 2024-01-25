import { RegisterColaboratorUseCase } from '@/domain/account/application/usecases/register-colaborator-use-case'
import { RegisterColaboratorController } from './register-colaborator-controller'
import { CompanyRepositoryPrisma } from '@/infra/database/prisma/repositories/company-repository-prisma'
import { ColaboratorRepositoryPrisma } from '@/infra/database/prisma/repositories/colaborator-repository-prisma'

const companyRepository = new CompanyRepositoryPrisma()
const colaboratorRepository = new ColaboratorRepositoryPrisma()
const usecase = new RegisterColaboratorUseCase(colaboratorRepository, companyRepository)
const registerColaboratorController = new RegisterColaboratorController(usecase)

export { registerColaboratorController }
