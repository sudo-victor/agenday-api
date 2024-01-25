import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { CustomerAlreadyRegisteredError } from '@/core/usecases/errors/customer-already-registered-error'
import { type RegisterCustomerUseCase } from '@/domain/account/application/usecases/register-customer-use-case'
import { RegisterCustomerValidator } from '@/infra/http/validators/register-customer-validator'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export class RegisterCustomerController {
  constructor (private readonly usecase: RegisterCustomerUseCase) {}

  async handler (request: FastifyRequest, response: FastifyReply): Promise<void> {
    try {
      const { body, params } = request
      const { companyId, cpf, email, name, phone } = RegisterCustomerValidator.match({ ...body as any, ...params as any })
      await this.usecase.execute({ companyId, cpf, email, name, phone })
      return await response.status(201).send()
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        return await response.status(404).send({ message: 'Company not found' })
      }
      if (error instanceof CustomerAlreadyRegisteredError) {
        return await response.status(404).send({ message: 'Customer already registered' })
      }

      throw error
    }
  }
}
