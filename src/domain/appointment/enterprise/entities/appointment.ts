import { Entity } from '@/core/domain/entity'
import { UniqueId } from '@/core/domain/unique-id'
import { randomUUID } from 'crypto'

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
  scheduledAt: Date
  canceledAt?: Date
}

export class Appointment extends Entity<AppointmentProps> {
  set customerId (data: UniqueId) {
    this.props.customerId = data
  }

  get customerId (): UniqueId {
    return this.props.customerId
  }

  set companyId (data: UniqueId) {
    this.props.companyId = data
  }

  get companyId (): UniqueId {
    return this.props.companyId
  }

  set scheduledAt (data: Date) {
    this.props.scheduledAt = data
  }

  get scheduledAt (): Date {
    return this.props.scheduledAt
  }

  set canceledAt (data: Date | undefined) {
    this.props.canceledAt = data
  }

  get canceledAt (): Date | undefined {
    return this.props.canceledAt
  }

  set status (data: string) {
    this.props.status = data
  }

  get status (): string {
    return this.props.status
  }

  static create (props: CreateAppointmentProps, id?: string): Appointment {
    return new Appointment({
      ...props,
      companyId: new UniqueId(props.companyId),
      customerId: new UniqueId(props.customerId),
      code: randomUUID(),
      status: 'pending'
    }, id)
  }

  cancel (): void {
    if (this.canceledAt) throw new Error('Appointment already canceled')
    this.props.canceledAt = new Date()
    this.props.status = 'canceled'
  }
}
