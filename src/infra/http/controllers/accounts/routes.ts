import { type FastifyInstance } from 'fastify'
import { registerAccountController } from './register-account'

export async function accountRoutes (app: FastifyInstance): Promise<void> {
  app.post('/register-account', registerAccountController.handler.bind(registerAccountController))
}
