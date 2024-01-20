import { Entity } from '@/core/domain/entity'
import { type UniqueId } from '@/core/domain/unique-id'
import { Cnpj } from '../value-objects/cnpj'
import { DaysOfWeek } from '../value-objects/days-of-week'
import { ScheduleInterval } from '../value-objects/schedule-interval'

interface CompanyProps {
  name: string
  cnpj: Cnpj
  ownerId: UniqueId
  daysOfWeek: DaysOfWeek
  scheduleInterval: ScheduleInterval
  startBusinessHour?: number
  endBusinessHour?: number
  startDate?: Date
  endDate?: Date
}

interface CreateCompanyProps {
  name: string
  cnpj: string
  ownerId: UniqueId
  daysOfWeek?: number[]
  startBusinessHour?: number
  endBusinessHour?: number
  startDate?: Date
  endDate?: Date
  scheduleInterval?: number
}

export class Company extends Entity<CompanyProps> {
  set daysOfWeek (data: number[] | DaysOfWeek) {
    this.props.daysOfWeek = data instanceof DaysOfWeek ? data : new DaysOfWeek(new Set(data))
  }

  get daysOfWeek (): DaysOfWeek {
    return this.props.daysOfWeek
  }

  set startBusinessHour (data: number | undefined) {
    this.props.startBusinessHour = data
  }

  get startBusinessHour (): number | undefined {
    return this.props.startBusinessHour
  }

  set endBusinessHour (data: number | undefined) {
    this.props.endBusinessHour = data
  }

  get endBusinessHour (): number | undefined {
    return this.props.endBusinessHour
  }

  set startDate (data: Date | undefined) {
    this.props.startDate = data
  }

  get startDate (): Date | undefined {
    return this.props.startDate
  }

  set endDate (data: Date | undefined) {
    this.props.endDate = data
  }

  get endDate (): Date | undefined {
    return this.props.endDate
  }

  set scheduleInterval (data: number | ScheduleInterval) {
    this.props.scheduleInterval = data instanceof ScheduleInterval ? data : ScheduleInterval.create(data)
  }

  get scheduleInterval (): ScheduleInterval {
    return this.props.scheduleInterval
  }

  get cnpj (): Cnpj {
    return this.props.cnpj
  }

  static create (props: CreateCompanyProps, id?: string): Company {
    return new Company({
      ...props,
      scheduleInterval: ScheduleInterval.create(props.scheduleInterval ?? 15),
      daysOfWeek: new DaysOfWeek(props.daysOfWeek ? new Set(props.daysOfWeek) : new Set()),
      cnpj: Cnpj.create(props.cnpj)
    }, id)
  }
}
