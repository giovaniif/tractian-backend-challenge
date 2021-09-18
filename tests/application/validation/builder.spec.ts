import { RequiredStringValidator, EmailValidator, ValidationBuilder } from '@/application/validations'

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder.of({ value: 'any_value', fieldName: 'any_name' }).required().build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })

  it('should return an EmailValidator', () => {
    const validators = ValidationBuilder.of({ value: 'any_value', fieldName: 'any_name' }).email().build()

    expect(validators).toEqual([new EmailValidator('any_value', 'any_name')])
  })

  it('should be able to mix validators', () => {
    const validators = ValidationBuilder.of({ value: 'any_value', fieldName: 'any_name' }).required().email().build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name'), new EmailValidator('any_value', 'any_name')])
  })
})