import { Appointment } from '@/domain/appointment/enterprise/entities/appointment'
import { randomUUID } from 'crypto'

interface MakeEntity {
  scheduledAt: Date
  companyId: string
  customerId: string
}

export class AppointmentFixtures {
  static makeEntity (props: Partial<MakeEntity> = {}): Appointment {
    return Appointment.create({
      companyId: randomUUID(),
      customerId: randomUUID(),
      scheduledAt: new Date('2024-01-05'),
      ...props
    })
  }
}
