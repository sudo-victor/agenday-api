import { ExceedCancellationPolicyDateError } from '@/core/usecases/errors/exceed-cancellation-policy-date-error'

export class ValidateCancellationPolicyService {
  static validate (input: Input): void {
    const cancellationPolicyLimitDate = input.scheduledAt
    cancellationPolicyLimitDate.setHours(cancellationPolicyLimitDate.getHours() - input.cancellationPolicyHour)
    if (new Date() > cancellationPolicyLimitDate) throw new ExceedCancellationPolicyDateError()
  }
}

interface Input {
  scheduledAt: Date
  cancellationPolicyHour: number
}
