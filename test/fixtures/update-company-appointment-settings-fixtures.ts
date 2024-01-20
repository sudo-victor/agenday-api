import { randomUUID } from 'crypto'

interface MakeInputProps {
  companyId: string
  daysOfWeek: number[]
  startBusinessHour: number
  endBusinessHour: number
  startDate: Date
  endDate: Date
  scheduleInterval: number
}

export class UpdateCompanyAppointmentSettingsFixtures {
  static makeInput (props: Partial<MakeInputProps> = {}): MakeInputProps {
    return {
      companyId: randomUUID(),
      daysOfWeek: [0, 1, 2, 4],
      startBusinessHour: 9.5,
      endBusinessHour: 17,
      startDate: new Date(),
      endDate: new Date(),
      scheduleInterval: 30,
      ...props
    }
  }
}
