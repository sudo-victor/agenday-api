import { UpdateCompanyAppointmentSettingsFixtures } from 'test/fixtures/update-company-appointment-settings-fixtures'
import { UpdateCompanyAppointmentSettingsUseCase } from './update-company-appointment-settings-use-case'
import { CompanyRepositoryInMemory } from 'test/in-memory/company-repository-in-memory'
import { CompanyFixtures } from 'test/fixtures/company-fixtures'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { InvalidDaysOfWeekError } from '@/core/domain/errors/invalid-days-of-week-error'
import { InvalidScheduleIntervalError } from '@/core/domain/errors/invalid-schedule-interval-error'

let companyRepository: CompanyRepositoryInMemory
let sut: UpdateCompanyAppointmentSettingsUseCase

describe('[Usecase] Update company appointment settings', () => {
  beforeEach(() => {
    companyRepository = new CompanyRepositoryInMemory()
    sut = new UpdateCompanyAppointmentSettingsUseCase(companyRepository)
  })

  it('should be able to update a company appointment settings', async () => {
    const entity = CompanyFixtures.makeEntity()
    await companyRepository.save(entity)
    const input = UpdateCompanyAppointmentSettingsFixtures.makeInput({ companyId: entity.id.toValue() })
    await sut.execute(input)
    const companyUpdated = companyRepository.items[0]
    expect(companyUpdated.daysOfWeek.toValue()).toStrictEqual(new Set(input.daysOfWeek))
    expect(companyUpdated.startBusinessHour).toEqual(input.startBusinessHour)
    expect(companyUpdated.endBusinessHour).toEqual(input.endBusinessHour)
    expect(companyUpdated.startDate).toEqual(input.startDate)
    expect(companyUpdated.endDate).toEqual(input.endDate)
    expect(companyUpdated.scheduleInterval?.toValue()).toEqual(input.scheduleInterval)
  })

  it('should not be able to update with invalid company id', async () => {
    const input = UpdateCompanyAppointmentSettingsFixtures.makeInput()
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CompanyNotFoundError)
  })

  it.each([
    JSON.stringify([7, 8]),
    JSON.stringify([-1, 8])
  ])('should not be able to update if days of weeks are invalids', async (daysOfWeekStr) => {
    const entity = CompanyFixtures.makeEntity()
    await companyRepository.save(entity)
    const daysOfWeek = JSON.parse(daysOfWeekStr) as number[]
    const input = UpdateCompanyAppointmentSettingsFixtures.makeInput({ daysOfWeek, companyId: entity.id.toValue() })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(InvalidDaysOfWeekError)
  })

  it.each([
    14,
    29,
    31,
    59,
    61
  ])('should not be able to update with invalid schedule interval', async (scheduleInterval) => {
    const entity = CompanyFixtures.makeEntity()
    await companyRepository.save(entity)
    const input = UpdateCompanyAppointmentSettingsFixtures.makeInput({ scheduleInterval, companyId: entity.id.toValue() })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(InvalidScheduleIntervalError)
  })
})
