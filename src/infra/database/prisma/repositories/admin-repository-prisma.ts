import { type AdminRepository } from '@/domain/account/application/repositories/admin-repository'
import { Admin } from '@/domain/account/enterprise/entities/admin'
import { prisma } from '../connection'

export class AdminRepositoryPrisma implements AdminRepository {
  async save (admin: Admin): Promise<void> {
    await prisma.user.create({
      data: {
        name: admin.name,
        document: admin.cpf.toValue(),
        documentType: 'CPF',
        email: admin.email,
        id: admin.id.toValue()
      }
    })
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Admin | null> {
    const admin = await prisma.user.findFirst({
      where: { OR: [{ email }, { document: cpf, documentType: 'CPF' }] }
    })
    if (!admin) {
      return null
    }

    return Admin.create({
      cpf: admin.document,
      email: admin.email,
      name: admin.name,
      password: admin.password ?? undefined,
      phone: admin.phone ?? undefined
    }, admin.id)
  }
}
