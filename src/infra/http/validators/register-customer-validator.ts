/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegexConstants } from '@/core/utils/constants/regex-constant'
import { z } from 'zod'

interface Props {
  companyId: string
  name: string
  phone: string
  cpf: string
  email: string
}

export class RegisterCustomerValidator {
  static match (data: any): Props {
    const validator = z.object({
      companyId: z.string(),
      name: z.string(),
      phone: z.string(),
      cpf: z.string().regex(RegexConstants.CPF),
      email: z.string().email()
    })
    return validator.parse(data)
  }
}
