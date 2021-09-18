import { CreateUserController } from '@/application/controllers'
import { EmailValidator, RequiredStringValidator } from '@/application/validations'

describe('Create User Controller', () => {
  let sut: CreateUserController
  let createUser: jest.Mock
  const email = 'valid_email@email.com'

  beforeAll(() => {
    createUser = jest.fn()
    createUser.mockResolvedValue({ id: 'user_id', name: 'user_name', email  })
  })

  beforeEach(() => {
    sut = new CreateUserController(createUser)
  })
  
  it('should call create user with correct params', async () => {
    await sut.handle({ companyId: 'any_id', name: 'any_name', email })

    expect(createUser).toHaveBeenCalledWith({ companyId: 'any_id', name: 'any_name', email })
    expect(createUser).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyId: 'any_id', name: 'any_name', email })

    expect(validators).toEqual([
      new RequiredStringValidator('any_id', 'companyId'),
      new RequiredStringValidator('any_name', 'name'),
      new RequiredStringValidator(email, 'email'),
      new EmailValidator(email, 'email')
    ])
  })

  it('should return 400 if usecase returns known error', async () => {
    createUser.mockResolvedValueOnce(new Error('any_error'))

    const response = await sut.handle({ companyId: 'any_id', name: 'any_name', email })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })

  it('should return 200 if usecase performs', async () => {
    const response = await sut.handle({ companyId: 'any_id', name: 'any_name', email })

    expect(response).toEqual({
      statusCode: 200,
      data: { id: 'user_id', name: 'user_name', email }
    })
  })
})
