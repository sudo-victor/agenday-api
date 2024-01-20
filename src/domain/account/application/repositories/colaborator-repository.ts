import { type Colaborator } from '../../enterprise/entities/colaborator'

export interface ColaboratorRepository {
  save: (colaborator: Colaborator) => Promise<void>
  findByEmailOrCpf: (email: string, cpf: string) => Promise<Colaborator | null>
}
