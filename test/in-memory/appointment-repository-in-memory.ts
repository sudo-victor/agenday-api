import { UniqueId } from '@/core/domain/unique-id'
import { type AppointmentRepository } from '@/domain/appointment/application/repositories/appointment-repository'
import { type Appointment } from '@/domain/appointment/enterprise/entities/appointment'

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  items: Appointment[] = []

  async save (appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findByDateAndCompanyId (scheduledAt: Date, companyId: string): Promise<Appointment | null> {
    const appointment = this.items.find((item) => {
      const hasSameCompanyId = item.companyId.isEqual(new UniqueId(companyId))
      const hasSameScheduleDate = item.scheduledAt.getTime() === scheduledAt.getTime()
      return hasSameCompanyId && hasSameScheduleDate
    })
    return appointment ?? null
  }
}
