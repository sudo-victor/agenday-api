import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { CustomerNotFoundError } from '@/core/usecases/errors/customer-not-found-error'
import { type CompanyGateway } from '../gateways/company-gateway'
import { type CustomerGateway } from '../gateways/customer-gateway'

export class ScheduleAnAppointmentUseCase {
  constructor (
    private readonly companyGateway: CompanyGateway,
    private readonly customerGateway: CustomerGateway
  ) {}

  async execute (input: Input): Promise<void> {
    const company = await this.companyGateway.getById(input.companyId)
    if (!company) throw new CompanyNotFoundError()
    const customer = await this.customerGateway.getById(input.customerId)
    if (!customer) throw new CustomerNotFoundError()
    // verify available
    // validate if is a valid day of week
    const dayOfWeek = input.scheduledAt.getDay()
    if (!company.daysOfWeek.includes(dayOfWeek)) throw new Error('Date unavailable')
    // validade if is between date
    // validade if is between business hour
    // validade hour
  }
}

interface Input {
  companyId: string
  customerId: string
  scheduledAt: Date
}
