import { UnauthorizedError } from '@/core/usecases/errors/unauthorized-error'
import { type CompanyGateway } from '../gateways/company-gateway'
import { type AppointmentRepository } from '../repositories/appointment-repository'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { ExceedCancellationPolicyDateError } from '@/core/usecases/errors/exceed-cancellation-policy-date-error'

export class CancelAppointmentUseCase {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly companyGateway: CompanyGateway
  ) {}

  async execute (input: Input): Promise<void> {
    const appointment = await this.appointmentRepository.findById(input.appointmentId)
    if (!appointment) throw new Error('Appointment not found')
    if (!appointment.customerId.isEqual(input.actorId)) throw new UnauthorizedError()
    const company = await this.companyGateway.getById(appointment.companyId.toValue())
    if (!company) throw new CompanyNotFoundError()
    const cancellationPolicyLimitDate = appointment.scheduledAt
    cancellationPolicyLimitDate.setHours(cancellationPolicyLimitDate.getHours() - company.cancellationPolicyHour)
    if (new Date() > cancellationPolicyLimitDate) throw new ExceedCancellationPolicyDateError()
    appointment.cancel()
    await this.appointmentRepository.update(appointment)
  }
}

interface Input {
  appointmentId: string
  actorId: string
}
