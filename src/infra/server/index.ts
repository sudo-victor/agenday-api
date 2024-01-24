import Fastify, { type FastifyInstance } from 'fastify'

class Server {
  private readonly server: FastifyInstance

  constructor () {
    this.server = Fastify({
      logger: true
    })
  }

  listen (port: number = 3333): void {
    this.server.listen({ port }, (err) => {
      if (err) {
        this.server.log.error(err)
        process.exit(1)
      }
    })
  }
}

export { Server }
