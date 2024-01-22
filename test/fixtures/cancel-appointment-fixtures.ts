import { randomUUID } from 'crypto'

interface MakeInput {
  appointmentId: string
  actorId: string
}

export class CancelAppointmentFixtures {
  static makeInput (props: Partial<MakeInput> = {}): MakeInput {
    return {
      appointmentId: randomUUID(),
      actorId: randomUUID(),
      ...props
    }
  }
}
