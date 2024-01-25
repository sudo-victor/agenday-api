import { Entity } from '@/core/domain/entity'
import { Cpf } from '../value-objects/cpf'
import { UniqueId } from '@/core/domain/unique-id'

interface ColaboratorProps {
  name: string
  email: string
  phone?: string
  cpf: Cpf
  password?: string
  companyId: UniqueId
}

export interface CreateColaboratorProps {
  name: string
  email: string
  phone?: string
  cpf: string
  password?: string
  companyId: string
}

export class Colaborator extends Entity<ColaboratorProps> {
  get companyId (): UniqueId {
    return this.props.companyId
  }

  get phone (): string | undefined {
    return this.props.phone
  }

  get name (): string {
    return this.props.name
  }

  get email (): string {
    return this.props.email
  }

  get cpf (): Cpf {
    return this.props.cpf
  }

  static create (props: CreateColaboratorProps, id?: string): Colaborator {
    return new Colaborator({
      ...props,
      companyId: new UniqueId(props.companyId),
      cpf: Cpf.create(props.cpf)
    }, id)
  }
}
