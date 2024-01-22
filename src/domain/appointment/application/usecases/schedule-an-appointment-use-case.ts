import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { CustomerNotFoundError } from '@/core/usecases/errors/customer-not-found-error'
import { type CompanyGateway } from '../gateways/company-gateway'
import { type CustomerGateway } from '../gateways/customer-gateway'
import { Appointment } from '../../enterprise/entities/appointment'
import { type AppointmentRepository } from '../repositories/appointment-repository'
import { DayOfTheWeekUnavailableError } from '@/core/usecases/errors/day-of-the-week-unavailable-error'
import { DateUnavailableError } from '@/core/usecases/errors/date-unavailable-error'
import { InvalidScheduleHourError } from '@/core/usecases/errors/invalid-schedule-hour-error'
import { DateAlreadyScheduledError } from '@/core/usecases/errors/date-already-scheduled-error'

export class ScheduleAnAppointmentUseCase {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly companyGateway: CompanyGateway,
    private readonly customerGateway: CustomerGateway
  ) {}

  async execute (input: Input): Promise<void> {
    const company = await this.companyGateway.getById(input.companyId)
    if (!company) throw new CompanyNotFoundError()
    const customer = await this.customerGateway.getById(input.customerId)
    if (!customer) throw new CustomerNotFoundError()
    const dayOfWeek = input.scheduledAt.getDay()
    if (!company.daysOfWeek.includes(dayOfWeek)) throw new DayOfTheWeekUnavailableError()
    const currentScheduleDateIsWithinAvailableRange = company.startDate <= input.scheduledAt && company.endDate >= input.scheduledAt
    if (!currentScheduleDateIsWithinAvailableRange) throw new DateUnavailableError()
    const scheduleHourInMinutes = input.scheduledAt.getHours() * 60 + input.scheduledAt.getMinutes()
    const doesHourIsValid = (scheduleHourInMinutes % company.scheduleInterval) === 0
    if (!doesHourIsValid) throw new InvalidScheduleHourError()
    const doesAppointmentAlreadyScheduled = await this.appointmentRepository.findByDateAndCompanyId(input.scheduledAt, company.id)
    if (doesAppointmentAlreadyScheduled) throw new DateAlreadyScheduledError()
    const appointment = Appointment.create({ ...input })
    await this.appointmentRepository.save(appointment)
  }
}

interface Input {
  companyId: string
  customerId: string
  scheduledAt: Date
}
