interface ICompany {
  id: string
  name: string
  cnpj: string
  daysOfWeek: number[]
  startBusinessHour: number
  endBusinessHour: number
  startDate: Date
  endDate: Date
  scheduleInterval: number
}

export interface CompanyGateway {
  getById: (id: string) => Promise<ICompany | null>
}
