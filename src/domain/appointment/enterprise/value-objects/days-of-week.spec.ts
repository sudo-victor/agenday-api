import { InvalidDaysOfWeekError } from '@/core/domain/errors/invalid-days-of-week-error'
import { DaysOfWeek } from './days-of-week'

describe('[Value Object] Days of week', () => {
  it.each([
    JSON.stringify([0, 1, 3, 5]),
    JSON.stringify([4, 3, 1]),
    JSON.stringify([0, 1, 2, 3, 4, 5, 6])
  ])('should be able to create an instance of DaysOfWeek', (daysOfWeekStr) => {
    const daysOfWeek = JSON.parse(daysOfWeekStr) as number[]
    const result = new DaysOfWeek(new Set(daysOfWeek))
    expect(result.toValue()).toEqual(new Set(daysOfWeek))
  })

  it.each([
    JSON.stringify([-1, -2, -4, 4]),
    JSON.stringify([7, 8, 3])
  ])('should not be able to create an instance of DaysOfWeek with value greater then 6 or less then 0', async (daysOfWeekStr) => {
    const daysOfWeek = JSON.parse(daysOfWeekStr) as number[]
    try {
      new DaysOfWeek(new Set(daysOfWeek))
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidDaysOfWeekError)
    }
  })
})
