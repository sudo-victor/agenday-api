import { InvalidCpfError } from '@/core/domain/errors/invalid-cpf-error'
import { Cpf } from './cpf'

describe('[Value Object] Cpf', () => {
  it('should be able to create a cpf instance', () => {
    const sut = Cpf.create('179.224.010-43')
    expect(sut.toValue()).toEqual('17922401043')
  })

  it.each([
    '12.345.678/0001-99',
    '000.000.000-00',
    '111.111.111-11'
  ])('should not be able to create a cpf instance to a invalid cpf', async (cpf: string) => {
    try {
      Cpf.create(cpf)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCpfError)
    }
  })
})
