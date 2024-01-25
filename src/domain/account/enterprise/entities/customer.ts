import { Entity } from '@/core/domain/entity'
import { Cpf } from '../value-objects/cpf'
import { UniqueId } from '@/core/domain/unique-id'

interface CustomerProps {
  name: string
  email: string
  phone: string
  cpf: Cpf
  password?: string
  companyId: UniqueId
}

export interface CreateCustomerProps {
  name: string
  email: string
  phone: string
  cpf: string
  password?: string
  companyId: string
}

export class Customer extends Entity<CustomerProps> {
  get name (): string {
    return this.props.name
  }

  get phone (): string {
    return this.props.phone
  }

  get companyId (): UniqueId {
    return this.props.companyId
  }

  get email (): string {
    return this.props.email
  }

  get cpf (): Cpf {
    return this.props.cpf
  }

  static create (props: CreateCustomerProps, id?: string): Customer {
    return new Customer({
      ...props,
      companyId: new UniqueId(props.companyId),
      cpf: Cpf.create(props.cpf)
    }, id)
  }
}
