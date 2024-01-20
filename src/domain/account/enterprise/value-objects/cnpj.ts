import { InvalidCnpjError } from '@/core/domain/errors/invalid-cnpj-error'
import { ValueObject } from '@/core/domain/value-object'

export class Cnpj extends ValueObject<string> {
  private static readonly REGEX_CNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/

  static create (cnpj: string): Cnpj {
    if (!this.isValid(cnpj)) {
      throw new InvalidCnpjError()
    }

    return new Cnpj(this.justNumbers(cnpj))
  }

  private static isValid (value: string | number | number[] = ''): boolean {
    if (!value) return false
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
    if (!validTypes) return false
    if (isString) {
      const digitsOnly = /^\d{14}$/.test(value)
      const validFormat = this.REGEX_CNPJ.test(value)
      const isValid = digitsOnly || validFormat
      if (!isValid) return false
    }
    const numbers = this.matchNumbers(value)
    if (numbers.length !== 14) return false
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
    const digits = numbers.slice(12)
    const digit0 = this.validCalc(12, numbers)
    if (digit0 !== digits[0]) return false
    const digit1 = this.validCalc(13, numbers)
    return digit1 === digits[1]
  }

  private static validCalc (x: number, numbers: number[]): number {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  private static matchNumbers (value: string | number | number[] = ''): number[] {
    const match = value.toString().match(/\d/g)
    return Array.isArray(match) ? match.map(Number) : []
  }

  private static justNumbers (cnpj: string): string {
    return this.matchNumbers(cnpj).join().replaceAll(',', '') as string
  }
}
