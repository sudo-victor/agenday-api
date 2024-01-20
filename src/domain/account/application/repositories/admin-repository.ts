import { type Admin } from '../../enterprise/entities/admin'

export interface AdminRepository {
  save: (admin: Admin) => Promise<void>
  findByEmailOrCpf: (email: string, cpf: string) => Promise<Admin | null>
}
