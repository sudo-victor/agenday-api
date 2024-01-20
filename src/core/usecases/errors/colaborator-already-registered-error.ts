export class ColaboratorAlreadyRegisteredError extends Error {
  constructor () {
    super('Colaborator already registered')
  }
}
