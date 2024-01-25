import { type FastifyInstance } from 'fastify'
import { registerAccountController } from './register-account'
import { registerColaboratorController } from './register-colaborator'

export async function accountRoutes (app: FastifyInstance): Promise<void> {
  app.post('/accounts', registerAccountController.handler.bind(registerAccountController))
  app.post('/companies/:companyId/colaborators', registerColaboratorController.handler.bind(registerColaboratorController))
}
