import { DateUnavailableError } from '@/core/usecases/errors/date-unavailable-error'
import { DayOfTheWeekUnavailableError } from '@/core/usecases/errors/day-of-the-week-unavailable-error'
import { InvalidScheduleHourError } from '@/core/usecases/errors/invalid-schedule-hour-error'

export class ValidateScheduleDateService {
  static match (company: Company, input: Input): void {
    const dayOfWeek = input.scheduledAt.getDay()
    if (!company.daysOfWeek.includes(dayOfWeek)) throw new DayOfTheWeekUnavailableError()
    const currentScheduleDateIsWithinAvailableRange = company.startDate <= input.scheduledAt && company.endDate >= input.scheduledAt
    if (!currentScheduleDateIsWithinAvailableRange) throw new DateUnavailableError()
    const scheduleHourInMinutes = input.scheduledAt.getHours() * 60 + input.scheduledAt.getMinutes()
    const doesHourIsValid = (scheduleHourInMinutes % company.scheduleInterval) === 0
    if (!doesHourIsValid) throw new InvalidScheduleHourError()
  }
}

interface Company {
  daysOfWeek: number[]
  startDate: Date
  endDate: Date
  scheduleInterval: number
}

interface Input {
  companyId: string
  customerId: string
  scheduledAt: Date
}
