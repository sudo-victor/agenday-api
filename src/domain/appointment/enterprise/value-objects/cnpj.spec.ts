import { InvalidCnpjError } from '@/core/domain/errors/invalid-cnpj-error'
import { Cnpj } from './cnpj'

describe('[Value Object] Cnpj', () => {
  it('should be able to create a cnpj instance', () => {
    const sut = Cnpj.create('76.230.887/0001-76')
    expect(sut.toValue()).toEqual('76230887000176')
  })

  it.each([
    '12.345.678/0001-99',
    '11.222.333/0000-44',
    '12.345.678/9101-12',
    '11.111.111/1111-11'
  ])('should not be able to create a cnpj instance to a invalid cnpj', async (cnpj: string) => {
    try {
      Cnpj.create(cnpj)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCnpjError)
    }
  })
})
