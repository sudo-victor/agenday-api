import { randomUUID } from 'crypto'

interface MakeInput {
  companyId: string
  customerId: string
  scheduledAt: Date
}

export class ScheduleAnAppointmentFixtures {
  static makeInput (props: Partial<MakeInput> = {}): MakeInput {
    return {
      companyId: randomUUID(),
      customerId: randomUUID(),
      scheduledAt: new Date(),
      ...props
    }
  }
}
