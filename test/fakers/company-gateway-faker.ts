import { type CompanyGatewayResponse, type CompanyGateway } from '@/domain/appointment/application/gateways/company-gateway'
import { randomUUID } from 'node:crypto'

export class CompanyGatewayFaker implements CompanyGateway {
  async getById (id: string): Promise<CompanyGatewayResponse | null> {
    return {
      id: randomUUID(),
      daysOfWeek: [1, 2, 3, 4],
      startBusinessHour: 9 * 60,
      endBusinessHour: 20 * 60,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-01'),
      scheduleInterval: 15
    }
  }
}
