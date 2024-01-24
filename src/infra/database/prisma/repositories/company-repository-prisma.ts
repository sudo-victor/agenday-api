import { type CompanyRepository } from '@/domain/account/application/repositories/company-repository'
import { Company } from '@/domain/account/enterprise/entities/company'
import { prisma } from '../connection'
import { UniqueId } from '@/core/domain/unique-id'

export class CompanyRepositoryPrisma implements CompanyRepository {
  async save (company: Company): Promise<void> {
    await prisma.company.create({
      data: {
        id: company.id.toValue(),
        document: company.cnpj.toValue(),
        name: company.name,
        ownerId: company.ownerId.toValue()
      }
    })
  }

  async update (company: Company): Promise<void> {}

  async findByCnpj (cnpj: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: { document: cnpj, documentType: 'CNPJ' }
    })
    if (!company) {
      return null
    }
    return Company.create({
      cnpj: company.document,
      name: company.name,
      ownerId: new UniqueId(company.ownerId)
    }, company.id)
  }

  async findById (id: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: { id }
    })
    if (!company) {
      return null
    }
    return Company.create({
      cnpj: company.document,
      name: company.name,
      ownerId: new UniqueId(company.ownerId)
    }, company.id)
  }
}
