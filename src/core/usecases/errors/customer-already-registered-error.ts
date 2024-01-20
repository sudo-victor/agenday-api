export class CustomerAlreadyRegisteredError extends Error {
  constructor () {
    super('Customer already registered')
  }
}
