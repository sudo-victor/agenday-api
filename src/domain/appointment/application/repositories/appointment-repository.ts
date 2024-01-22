import { type Appointment } from '../../enterprise/entities/appointment'

export interface AppointmentRepository {
  save: (admin: Appointment) => Promise<void>
  findByDateAndCompanyId: (scheduledAt: Date, companyId: string) => Promise<Appointment | null>
}
