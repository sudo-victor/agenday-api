import { InvalidScheduleIntervalError } from '@/core/domain/errors/invalid-schedule-interval-error'
import { ScheduleInterval } from './schedule-interval'

describe('[Value Object] Schedule interval', () => {
  it.each([15, 30, 60])('should be able to create an instance of ScheduleInterval', (value) => {
    const result = new ScheduleInterval(value)
    expect(result.toValue()).toEqual(value)
  })

  it.each([
    -10,
    10,
    29,
    14,
    59,
    61
  ])('should not be able to create an instance of ScheduleInterval with values diff of 15, 30 & 60', (value) => {
    try {
      new ScheduleInterval(value)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidScheduleIntervalError)
    }
  })
})
