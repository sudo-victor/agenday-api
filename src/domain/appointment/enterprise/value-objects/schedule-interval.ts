import { InvalidScheduleIntervalError } from '@/core/domain/errors/invalid-schedule-interval-error'
import { ValueObject } from '@/core/domain/value-object'

export class ScheduleInterval extends ValueObject<number> {
  private static readonly VALID_SCHEDULE_INTERVALS = [15, 30, 60]

  static create (value: number): ScheduleInterval {
    this.validate(value)
    return new ScheduleInterval(value)
  }

  private static validate (value: number): void {
    if (!this.VALID_SCHEDULE_INTERVALS.includes(value)) {
      throw new InvalidScheduleIntervalError()
    }
  }
}
