import { UniqueId } from './unique-id'

export class Entity<Props> {
  readonly id: UniqueId
  protected readonly props: Props

  constructor (props: Props, id?: string) {
    this.id = new UniqueId(id)
    this.props = props
  }
}
