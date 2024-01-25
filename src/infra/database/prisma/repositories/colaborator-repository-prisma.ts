import { type ColaboratorRepository } from '@/domain/account/application/repositories/colaborator-repository'
import { Colaborator } from '@/domain/account/enterprise/entities/colaborator'
import { prisma } from '../connection'

export class ColaboratorRepositoryPrisma implements ColaboratorRepository {
  async save (colaborator: Colaborator): Promise<void> {
    await prisma.user.create({
      data: {
        name: colaborator.name,
        companyId: colaborator.companyId.toValue(),
        phone: colaborator.phone,
        document: colaborator.cpf.toValue(),
        documentType: 'CPF',
        email: colaborator.email,
        id: colaborator.id.toValue()
      }
    })
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Colaborator | null> {
    const colaborator = await prisma.user.findFirst({
      where: { OR: [{ email }, { document: cpf, documentType: 'CPF' }] }
    })
    if (!colaborator) {
      return null
    }

    return Colaborator.create({
      cpf: colaborator.document,
      email: colaborator.email,
      name: colaborator.name,
      password: colaborator.password ?? undefined,
      phone: colaborator.phone ?? undefined,
      companyId: colaborator.companyId as string
    }, colaborator.id)
  }
}
