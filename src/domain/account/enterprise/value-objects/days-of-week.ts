import { ValueObject } from '@/core/domain/value-object'
import { InvalidDaysOfWeekError } from '@/core/domain/errors/invalid-days-of-week-error'

export class DaysOfWeek extends ValueObject<Set<number>> {
  constructor (value: Set<number>) {
    super(value)
    if (value instanceof DaysOfWeek) {
      this.value = value.toValue()
      return
    }

    this.validate(value)
    this.value = new Set(value)
  }

  private validate (value: Set<number>): void {
    value.forEach(day => {
      if (day > 6 || day < 0) {
        throw new InvalidDaysOfWeekError()
      }
    })
  }
}
