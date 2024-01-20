import { randomUUID } from 'node:crypto'

export class UniqueId {
  readonly id: string

  constructor (id?: string) {
    this.id = id ?? randomUUID()
  }

  toValue (): string {
    return this.id
  }

  isEqual (id: UniqueId | string): boolean {
    return typeof id === 'string' ? this.id === id : this.id === id.toValue()
  }
}
