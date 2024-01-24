import { CompanyAlreadyExistsError } from '@/core/usecases/errors/company-already-exists-error'
import { UserAlreadyExistsError } from '@/core/usecases/errors/user-already-exists-error'
import { type RegisterAccountUseCase } from '@/domain/account/application/usecases/register-account-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { RegisterAccountValidator } from '../../../validators/register-account-validator'

export class RegisterAccountController {
  constructor (private readonly usecase: RegisterAccountUseCase) {}

  async handler (request: FastifyRequest, response: FastifyReply): Promise<void> {
    try {
      const { body } = request
      const { name, companyName, cnpj, cpf, email } = RegisterAccountValidator.match(body)
      await this.usecase.execute({ name, companyName, cnpj, cpf, email })
      await response.status(201).send()
    } catch (error) {
      if (error instanceof CompanyAlreadyExistsError) {
        return await response.status(400).send({ message: error.message })
      }
      if (error instanceof UserAlreadyExistsError) {
        return await response.status(400).send({ message: error.message })
      }
      throw error
    }
  }
}
