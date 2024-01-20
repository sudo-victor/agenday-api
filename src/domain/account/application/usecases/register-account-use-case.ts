import { CompanyAlreadyExistsError } from '@/core/usecases/errors/company-already-exists-error'
import { Admin } from '../../enterprise/entities/admin'
import { Company } from '../../enterprise/entities/company'
import { UserAlreadyExistsError } from '@/core/usecases/errors/user-already-exists-error'
import { type AdminRepository } from '../repositories/admin-repository'
import { type CompanyRepository } from '../repositories/company-repository'

export class RegisterAccountUseCase {
  constructor (
    private readonly adminRepository: AdminRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const companyAlreadyExists = await this.companyRepository.findByCnpj(input.cnpj)
    if (companyAlreadyExists) throw new CompanyAlreadyExistsError()
    const adminAlreadyExists = await this.adminRepository.findByEmailOrCpf(input.email, input.cpf)
    if (adminAlreadyExists) throw new UserAlreadyExistsError()
    const admin = Admin.create({ cpf: input.cpf, email: input.email, name: input.name })
    await this.adminRepository.save(admin)
    const company = Company.create({
      cnpj: input.cnpj,
      name: input.companyName,
      ownerId: admin.id
    })
    await this.companyRepository.save(company)
  }
}

interface Input {
  companyName: string
  cnpj: string
  name: string
  cpf: string
  email: string
}
