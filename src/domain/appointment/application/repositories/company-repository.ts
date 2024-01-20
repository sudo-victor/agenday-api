import { type Company } from '../../enterprise/entities/company'

export interface CompanyRepository {
  save: (company: Company) => Promise<void>
  update: (company: Company) => Promise<void>
  findByCnpj: (cnpj: string) => Promise<Company | null>
  findById: (id: string) => Promise<Company | null>
}
