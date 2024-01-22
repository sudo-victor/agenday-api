export interface CompanyGatewayResponse {
  id: string
  daysOfWeek: number[]
  startBusinessHour: number
  endBusinessHour: number
  startDate: Date
  endDate: Date
  scheduleInterval: number
  cancellationPolicyHour: number
}

export interface CompanyGateway {
  getById: (id: string) => Promise<CompanyGatewayResponse | null>
}
