import { type CompanyGateway } from '../gateways/company-gateway'
import { type CustomerGateway } from '../gateways/customer-gateway'
import { AppointmentRepositoryInMemory } from 'test/in-memory/appointment-repository-in-memory'
import { ScheduleAnAppointmentUseCase } from './schedule-an-appointment-use-case'
import { CompanyGatewayFaker } from 'test/fakers/company-gateway-faker'
import { CustomerGatewayFaker } from 'test/fakers/customer-gateway-faker'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { CustomerNotFoundError } from '@/core/usecases/errors/customer-not-found-error'
import { ScheduleAnAppointmentFixtures } from 'test/fixtures/schedule-an-appointment-fixtures'
import { DayOfTheWeekUnavailableError } from '@/core/usecases/errors/day-of-the-week-unavailable-error'
import { DateUnavailableError } from '@/core/usecases/errors/date-unavailable-error'
import { InvalidScheduleHourError } from '@/core/usecases/errors/invalid-schedule-hour-error'
import { DateAlreadyScheduledError } from '@/core/usecases/errors/date-already-scheduled-error'
import { randomUUID } from 'crypto'

let companyGateway: CompanyGateway
let customerGateway: CustomerGateway
let appointmentRepository: AppointmentRepositoryInMemory
let sut: ScheduleAnAppointmentUseCase

describe('[Use Case] Schedule an appointment', () => {
  beforeEach(() => {
    companyGateway = new CompanyGatewayFaker()
    customerGateway = new CustomerGatewayFaker()
    appointmentRepository = new AppointmentRepositoryInMemory()
    sut = new ScheduleAnAppointmentUseCase(appointmentRepository, companyGateway, customerGateway)
  })

  it('should be able to schedule an appointment', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput({ scheduledAt: new Date('2024-01-02') })
    await sut.execute(input)
    const appointmentPersisted = appointmentRepository.items[0]
    expect(appointmentPersisted.id.toValue()).toBeDefined()
  })

  it('should not be able to schedule an appointment with invalid company', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput()
    vi.spyOn(companyGateway, 'getById').mockResolvedValue(null)
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CompanyNotFoundError)
  })

  it('should not be able to schedule an appointment with invalid customer', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput()
    vi.spyOn(customerGateway, 'getById').mockResolvedValue(null)
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CustomerNotFoundError)
  })

  it('should not be able to schedule an appointment with invalid day of week', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput({ scheduledAt: new Date('2024-01-21') })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(DayOfTheWeekUnavailableError)
  })

  it('should not be able to schedule an appointment with a scheduled date outside the available date', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput({ scheduledAt: new Date('2024-12-03') })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(DateUnavailableError)
  })

  it('should not be able to schedule an appointment with a scheduled hour outside the available hour', async () => {
    const input = ScheduleAnAppointmentFixtures.makeInput({ scheduledAt: new Date('2024-04-10 13:23') })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(InvalidScheduleHourError)
  })

  it('should not be able to schedule if date & hour was already filled', async () => {
    const companyId = randomUUID()
    vi.spyOn(companyGateway, 'getById').mockResolvedValue({
      id: companyId,
      daysOfWeek: [1, 2, 3, 4],
      startBusinessHour: 9 * 60,
      endBusinessHour: 20 * 60,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-01'),
      scheduleInterval: 15,
      cancellationPolicyHour: 1
    })
    const input = ScheduleAnAppointmentFixtures.makeInput({
      scheduledAt: new Date('2024-04-10 12:00'), companyId
    })
    await sut.execute(input)
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(DateAlreadyScheduledError)
  })
})
