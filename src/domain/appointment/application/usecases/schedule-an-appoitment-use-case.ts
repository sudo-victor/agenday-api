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
  }
}

interface Input {
  companyId: string
  customerId: string
  scheduledAt: Date
}
