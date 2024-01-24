import { Entity } from '@/core/domain/entity'
import { Cpf } from '../value-objects/cpf'

export interface AdminProps {
  name: string
  email: string
  phone?: string
  cpf: Cpf
  password?: string
}

export interface CreateAdminProps {
  name: string
  email: string
  phone?: string
  cpf: string
  password?: string
}

export class Admin extends Entity<AdminProps> {
  get name (): string {
    return this.props.name
  }

  get email (): string {
    return this.props.email
  }

  get cpf (): Cpf {
    return this.props.cpf
  }

  static create (props: CreateAdminProps, id?: string): Admin {
    return new Admin({
      ...props,
      cpf: Cpf.create(props.cpf)
    }, id)
  }
}
