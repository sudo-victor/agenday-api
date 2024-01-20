import { type AdminRepository } from '@/domain/appointment/application/repositories/admin-repository'
import { type Admin } from '@/domain/appointment/enterprise/entities/admin'
import { Cpf } from '@/domain/appointment/enterprise/value-objects/cpf'

export class AdminRepositoryInMemory implements AdminRepository {
  items: Admin[] = []

  async save (admin: Admin): Promise<void> {
    this.items.push(admin)
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.email === email || item.cpf.isEqual(Cpf.create(cpf)))
    if (!admin) {
      return null
    }

    return admin
  }
}
