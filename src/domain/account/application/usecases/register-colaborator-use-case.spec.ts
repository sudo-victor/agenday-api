import { RegisterColaboratorUseCase } from './register-colaborator-use-case'
import { ColaboratorRepositoryInMemory } from 'test/in-memory/colaborator-repository-in-memory'
import { CompanyRepositoryInMemory } from 'test/in-memory/company-repository-in-memory'
import { CompanyFixtures } from 'test/fixtures/company-fixtures'
import { RegisterColaboratorFixtures } from 'test/fixtures/register-colaborator-fixtures'
import { CompanyNotFoundError } from '@/core/usecases/errors/company-not-found-error'
import { ColaboratorFixtures } from 'test/fixtures/colaborator-fixtures'
import { ColaboratorAlreadyRegisteredError } from '@/core/usecases/errors/colaborator-already-registered-error'

let companyRepository: CompanyRepositoryInMemory
let colaboratorRepository: ColaboratorRepositoryInMemory
let sut: RegisterColaboratorUseCase

describe('[Use Case] Register colaborator use case', () => {
  beforeEach(() => {
    companyRepository = new CompanyRepositoryInMemory()
    colaboratorRepository = new ColaboratorRepositoryInMemory()
    sut = new RegisterColaboratorUseCase(colaboratorRepository, companyRepository)
  })

  it('should be able to register a colaborator', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const input = RegisterColaboratorFixtures.makeInput({ companyId: company.id.toValue() })
    await sut.execute(input)
    const colaboratorPersisted = colaboratorRepository.items[0]
    expect(colaboratorPersisted.id.toValue()).toBeDefined()
    expect(colaboratorPersisted.cpf.toValue()).toBe(input.cpf.replace(/\./g, '').replace(/\-/g, ''))
    expect(colaboratorPersisted.email).toBe(input.email)
  })

  it('should not be able to register a colaborator with invalid company id', async () => {
    const input = RegisterColaboratorFixtures.makeInput()
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(CompanyNotFoundError)
  })

  it('should not be able to register a colaborator with cpf already registered', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const colaborator = ColaboratorFixtures.makeEntity()
    await colaboratorRepository.save(colaborator)
    const input = RegisterColaboratorFixtures.makeInput({ companyId: company.id.toValue(), cpf: colaborator.cpf.toValue() })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(ColaboratorAlreadyRegisteredError)
  })

  it('should not be able to register a colaborator with email already registered', async () => {
    const company = CompanyFixtures.makeEntity()
    await companyRepository.save(company)
    const colaborator = ColaboratorFixtures.makeEntity()
    await colaboratorRepository.save(colaborator)
    const input = RegisterColaboratorFixtures.makeInput({ companyId: company.id.toValue(), cpf: '670.944.160-16', email: colaborator.email })
    const callback = async (): Promise<void> => { await sut.execute(input) }
    await expect(callback).rejects.toBeInstanceOf(ColaboratorAlreadyRegisteredError)
  })
})
