import { InvalidCpfError } from '@/core/domain/errors/invalid-cpf-error'
import { ValueObject } from '@/core/domain/value-object'

export class Cpf extends ValueObject<string> {
  static create (cpf: string): Cpf {
    if (!this.isValid(cpf)) {
      throw new InvalidCpfError()
    }

    return new Cpf(this.justNumbers(cpf))
  }

  private static isValid (value: string): boolean {
    value = value.replace(/\D/g, '')
    if (value.length !== 11) {
      return false
    }
    if (/^(\d)\1+$/.test(value)) {
      return false
    }
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(value.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    let digit = remainder >= 10 ? 0 : remainder
    if (digit !== parseInt(value.charAt(9))) {
      return false
    }
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(value.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    digit = remainder >= 10 ? 0 : remainder
    if (digit !== parseInt(value.charAt(10))) {
      return false
    }
    return true
  }

  private static justNumbers (value: string): string {
    return value.replace(/[^0-9]/g, '')
  }
}
