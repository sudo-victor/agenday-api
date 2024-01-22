export class DateAlreadyScheduledError extends Error {
  constructor () {
    super('Date already scheduled')
  }
}
