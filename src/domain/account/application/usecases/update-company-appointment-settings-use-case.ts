import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { type CompanyRepository } from '../repositories/company-repository'

export class UpdateCompanyAppointmentSettingsUseCase {
  constructor (
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const company = await this.companyRepository.findById(input.companyId)
    if (!company) throw new CompanyNotFoundError()
    company.daysOfWeek = input.daysOfWeek
    company.startBusinessHour = input.startBusinessHour
    company.endBusinessHour = input.endBusinessHour
    company.startDate = input.startDate
    company.endDate = input.endDate
    company.scheduleInterval = input.scheduleInterval
    company.cancellationPolicyHour = input.cancellationPolicyHour
    await this.companyRepository.update(company)
  }
}

interface Input {
  companyId: string
  daysOfWeek: number[]
  startBusinessHour: number
  endBusinessHour: number
  startDate: Date
  endDate: Date
  scheduleInterval: number
  cancellationPolicyHour: number
}
