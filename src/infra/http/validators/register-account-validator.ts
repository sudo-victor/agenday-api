/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegexConstants } from '@/core/utils/constants/regex-constant'
import { z } from 'zod'

interface Props {
  name: string
  companyName: string
  cnpj: string
  cpf: string
  email: string
}

export class RegisterAccountValidator {
  static match (data: any): Props {
    const validator = z.object({
      name: z.string(),
      companyName: z.string(),
      cnpj: z.string().regex(RegexConstants.CNPJ),
      cpf: z.string().regex(RegexConstants.CPF),
      email: z.string()
    })
    return validator.parse(data)
  }
}
