import { type ColaboratorRepository } from '@/domain/account/application/repositories/colaborator-repository'
import { type Colaborator } from '@/domain/account/enterprise/entities/colaborator'
import { Cpf } from '@/domain/account/enterprise/value-objects/cpf'

export class ColaboratorRepositoryInMemory implements ColaboratorRepository {
  items: Colaborator[] = []

  async save (colaborator: Colaborator): Promise<void> {
    this.items.push(colaborator)
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Colaborator | null> {
    const colaborator = this.items.find((item) => item.email === email || item.cpf.isEqual(Cpf.create(cpf)))
    return !colaborator ? null : colaborator
  }
}
