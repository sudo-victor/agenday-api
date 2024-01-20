import { UniqueId } from '@/core/domain/unique-id'
import { type CompanyRepository } from '@/domain/account/application/repositories/company-repository'
import { type Company } from '@/domain/account/enterprise/entities/company'
import { Cnpj } from '@/domain/account/enterprise/value-objects/cnpj'

export class CompanyRepositoryInMemory implements CompanyRepository {
  items: Company[] = []

  async save (company: Company): Promise<void> {
    this.items.push(company)
  }

  async findByCnpj (cnpj: string): Promise<Company | null> {
    const company = this.items.find((item) => item.cnpj.isEqual(Cnpj.create(cnpj)))
    return !company ? null : company
  }

  async update (company: Company): Promise<void> {
    const current = this.items.find(item => item.id.isEqual(company.id))
    if (!current) return undefined
    current.daysOfWeek = company.daysOfWeek
    current.startBusinessHour = company.startBusinessHour
    current.endBusinessHour = company.endBusinessHour
    current.startDate = company.startDate
    current.endDate = company.endDate
    current.scheduleInterval = company.scheduleInterval
  }

  async findById (id: string): Promise<Company | null> {
    const company = this.items.find((item) => item.id.isEqual(new UniqueId(id)))
    return !company ? null : company
  }
}
