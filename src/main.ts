import { env } from './infra/env'
import { app } from './infra/server'

app.listen({
  host: '0.0.0.0',
  port: env.PORT
}).then(() => {
  console.log('🚀 HTTP Server Running!')
})
