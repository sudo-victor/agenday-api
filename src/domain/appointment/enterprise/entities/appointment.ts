import { Entity } from '@/core/domain/entity'
import { UniqueId } from '@/core/domain/unique-id'

interface AppointmentProps {
  companyId: UniqueId
  customerId: UniqueId
  code: string
  scheduledAt: Date
  canceledAt?: Date
  status: string
}

interface CreateAppointmentProps {
  companyId: string
  customerId: string
  code: string
  scheduledAt: Date
  canceledAt?: Date
  status: string
}

export class Appointment extends Entity<AppointmentProps> {
  static create (props: CreateAppointmentProps, id?: string): Appointment {
    return new Appointment({
      ...props,
      companyId: new UniqueId(props.companyId),
      customerId: new UniqueId(props.customerId)
    }, id)
  }
}
