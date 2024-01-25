import { ColaboratorAlreadyRegisteredError } from '@/core/usecases/errors/colaborator-already-registered-error'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { type RegisterColaboratorUseCase } from '@/domain/account/application/usecases/register-colaborator-use-case'
import { RegisterColaboratorValidator } from '@/infra/http/validators/register-colaborator-validator'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export class RegisterColaboratorController {
  constructor (
    private readonly usecase: RegisterColaboratorUseCase
  ) {}

  async handler (request: FastifyRequest, response: FastifyReply): Promise<void> {
    try {
      const { body, params } = request
      const { companyId, cpf, email, name } = RegisterColaboratorValidator.match({ ...body as any, ...params as any })
      await this.usecase.execute({ companyId, cpf, email, name })
      return await response.status(201).send()
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        return await response.status(404).send({ message: 'Company not found' })
      }
      if (error instanceof ColaboratorAlreadyRegisteredError) {
        return await response.status(404).send({ message: 'Colaborator already registered' })
      }

      throw error
    }
  }
}
