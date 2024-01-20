import { AdminRepositoryInMemory } from 'test/in-memory/admin-repository-in-memory'
import { RegisterAccountUseCase } from './register-account-use-case'
import { CompanyRepositoryInMemory } from 'test/in-memory/company-repository-in-memory'
import { UserAlreadyExistsError } from '@/core/usecases/errors/user-already-exists-error'
import { CompanyAlreadyExistsError } from '@/core/usecases/errors/company-already-exists-error'
import { RegisterAccountFixtures } from 'test/fixtures/register-account-fixtures'

let adminRepository: AdminRepositoryInMemory
let companyRepository: CompanyRepositoryInMemory
let sut: RegisterAccountUseCase

describe('[Usecase] Register account', () => {
  beforeEach(() => {
    adminRepository = new AdminRepositoryInMemory()
    companyRepository = new CompanyRepositoryInMemory()
    sut = new RegisterAccountUseCase(adminRepository, companyRepository)
  })

  it('should be able to register an account', async () => {
    const input = RegisterAccountFixtures.makeInput()
    await sut.execute(input)
    const adminPersisted = adminRepository.items[0]
    const companyPersisted = companyRepository.items[0]
    expect(adminPersisted.id.toValue()).toBeDefined()
    expect(adminPersisted.cpf.toValue()).toEqual('21433688018')
    expect(companyPersisted.cnpj.toValue()).toEqual('84677626000127')
  })

  it('should not be able to register an account with duplicated email', async () => {
    await sut.execute(RegisterAccountFixtures.makeInput())
    const duplicatedEmail = adminRepository.items[0].email
    const input = RegisterAccountFixtures.makeInput({ cnpj: '57.698.598/0001-51', cpf: '326.665.270-34', email: duplicatedEmail })
    await expect(async () => { await sut.execute(input) }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register an account with duplicated cpf', async () => {
    await sut.execute(RegisterAccountFixtures.makeInput())
    const duplicatedCpf = adminRepository.items[0].cpf.toValue()
    const input = RegisterAccountFixtures.makeInput({ cnpj: '57.698.598/0001-51', cpf: duplicatedCpf })
    await expect(async () => { await sut.execute(input) }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register an account with duplicated cnpj', async () => {
    await sut.execute(RegisterAccountFixtures.makeInput())
    const duplicatedCnpj = companyRepository.items[0].cnpj.toValue()
    const input = RegisterAccountFixtures.makeInput({ cnpj: duplicatedCnpj })
    await expect(async () => { await sut.execute(input) }).rejects.toBeInstanceOf(CompanyAlreadyExistsError)
  })
})
