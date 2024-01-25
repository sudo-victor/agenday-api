import { type CustomerRepository } from '@/domain/account/application/repositories/customer-repository'
import { Customer } from '@/domain/account/enterprise/entities/customer'
import { prisma } from '../connection'

export class CustomerRepositoryPrisma implements CustomerRepository {
  async save (customer: Customer): Promise<void> {
    await prisma.user.create({
      data: {
        name: customer.name,
        companyId: customer.companyId.toValue(),
        phone: customer.phone,
        document: customer.cpf.toValue(),
        documentType: 'CPF',
        email: customer.email,
        id: customer.id.toValue()
      }
    })
  }

  async findByEmailOrCpf (email: string, cpf: string): Promise<Customer | null> {
    const customer = await prisma.user.findFirst({
      where: { OR: [{ email }, { document: cpf, documentType: 'CPF' }] }
    })
    if (!customer) {
      return null
    }

    return Customer.create({
      cpf: customer.document,
      email: customer.email,
      name: customer.name,
      password: customer.password ?? undefined,
      phone: customer.phone ?? '',
      companyId: customer.companyId as string
    }, customer.id)
  }
}
