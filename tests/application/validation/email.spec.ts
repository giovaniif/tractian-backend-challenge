import { EmailValidator } from '@/application/validations'
import { InvalidEmailError } from '@/application/errors'

describe('Email Validator', () => {
  it('should return InvalidEmailError if value is empty', () => {
    const sut = new EmailValidator('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError('any_field'))
  })

  it('should return InvalidEmailError if value is null', () => {
    const sut = new EmailValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError('any_field'))
  })

  it('should return InvalidEmailError if value is undefined', () => {
    const sut = new EmailValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError('any_field'))
  })

  it('should return InvalidEmailError if value is not a valid email', () => {
    const sut = new EmailValidator('any_invalid_string', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError('any_field'))
  })

  it('should return undefined if email is valid', () => {
    const sut = new EmailValidator('my_email@email.com', 'any_field')

    const result = sut.validate()

    expect(result).toBeUndefined()
  })
})
