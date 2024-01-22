import { AppointmentRepositoryInMemory } from 'test/in-memory/appointment-repository-in-memory'
import { type CompanyGateway } from '../gateways/company-gateway'
import { CancelAppointmentUseCase } from './cancel-appointment-use-case'
import { CompanyGatewayFaker } from 'test/fakers/company-gateway-faker'
import { AppointmentFixtures } from 'test/fixtures/appointment-fixtures'
import { CancelAppointmentFixtures } from 'test/fixtures/cancel-appointment-fixtures'
import { UnauthorizedError } from '@/core/usecases/errors/unauthorized-error'
import { randomUUID } from 'crypto'
import { ExceedCancellationPolicyDateError } from '@/core/usecases/errors/exceed-cancellation-policy-date-error'

let companyGateway: CompanyGateway
let appointmentRepository: AppointmentRepositoryInMemory
let sut: CancelAppointmentUseCase

describe('[Use Case] Cancel appointment', () => {
  beforeEach(() => {
    companyGateway = new CompanyGatewayFaker()
    appointmentRepository = new AppointmentRepositoryInMemory()
    sut = new CancelAppointmentUseCase(appointmentRepository, companyGateway)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to cancel an appointment', async () => {
    vi.setSystemTime(new Date('2024-01-02 12:00'))
    const appointment = AppointmentFixtures.makeEntity({ scheduledAt: new Date('2024-01-02 15:00') })
    await appointmentRepository.save(appointment)
    const input = CancelAppointmentFixtures.makeInput({
      appointmentId: appointment.id.toValue(), actorId: appointment.customerId.toValue()
    })
    await sut.execute(input)
    const appointmentPersisted = appointmentRepository.items[0]
    expect(appointmentPersisted.canceledAt).toBeDefined()
    expect(appointmentPersisted.status).toBe('canceled')
  })

  it('should not be able to cancel an appointment with invalid actor id', async () => {
    const appointment = AppointmentFixtures.makeEntity()
    await appointmentRepository.save(appointment)
    const input = CancelAppointmentFixtures.makeInput({ appointmentId: appointment.id.toValue() })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to cancel an appointment after cancellation policy', async () => {
    vi.setSystemTime(new Date('2024-01-02 12:01'))
    vi.spyOn(companyGateway, 'getById').mockResolvedValue({
      id: randomUUID(),
      daysOfWeek: [1, 2, 3, 4],
      startBusinessHour: 9 * 60,
      endBusinessHour: 20 * 60,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-01'),
      scheduleInterval: 15,
      cancellationPolicyHour: 3
    })
    const appointment = AppointmentFixtures.makeEntity({ scheduledAt: new Date('2024-01-02 15:00') })
    await appointmentRepository.save(appointment)
    const input = CancelAppointmentFixtures.makeInput({
      appointmentId: appointment.id.toValue(), actorId: appointment.customerId.toValue()
    })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(ExceedCancellationPolicyDateError)
  })
})
