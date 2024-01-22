export class ExceedCancellationPolicyDateError extends Error {
  constructor () {
    super('Exceed cancellation policy date')
  }
}
