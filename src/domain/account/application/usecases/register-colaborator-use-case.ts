import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { type ColaboratorRepository } from '../repositories/colaborator-repository'
import { type CompanyRepository } from '../repositories/company-repository'
import { Colaborator } from '../../enterprise/entities/colaborator'
import { ColaboratorAlreadyRegisteredError } from '@/core/usecases/errors/colaborator-already-registered-error'

export class RegisterColaboratorUseCase {
  constructor (
    private readonly colaboratorRepository: ColaboratorRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const company = await this.companyRepository.findById(input.companyId)
    if (!company) throw new CompanyNotFoundError()
    const colaboratorAlreadyExists = await this.colaboratorRepository.findByEmailOrCpf(input.email, input.cpf)
    if (colaboratorAlreadyExists) throw new ColaboratorAlreadyRegisteredError()
    const colaborator = Colaborator.create({ ...input })
    await this.colaboratorRepository.save(colaborator)
  }
}

interface Input {
  companyId: string
  name: string
  cpf: string
  email: string
}
