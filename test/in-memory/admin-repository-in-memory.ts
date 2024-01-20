import { type AdminRepository } from '@/domain/account/application/repositories/admin-repository'
import { type Admin } from '@/domain/account/enterprise/entities/admin'
import { Cpf } from '@/domain/account/enterprise/value-objects/cpf'

export class AdminRepositoryInMemory implements AdminRepository {
  items: Admin[] = []

  async save (admin: Admin): Promise<void> {
    this.items.push(admin)
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.email === email || item.cpf.isEqual(Cpf.create(cpf)))
    return !admin ? null : admin
  }
}
