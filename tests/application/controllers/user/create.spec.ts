import { CreateUserController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('Create User Controller', () => {
  let sut: CreateUserController
  let createUser: jest.Mock

  beforeAll(() => {
    createUser = jest.fn()
    createUser.mockResolvedValue({ id: 'user_id', name: 'user_name', email: 'user_name'  })
  })

  beforeEach(() => {
    sut = new CreateUserController(createUser)
  })
  
  it('should call create user with correct params', async () => {
    await sut.handle({ companyId: 'any_id', name: 'any_name', email: 'any_email' })

    expect(createUser).toHaveBeenCalledWith({ companyId: 'any_id', name: 'any_name', email: 'any_email' })
    expect(createUser).toHaveBeenCalledTimes(1)
  })

  // it('should build validators correctly', async () => {
  //   const validators = sut.buildValidators({ companyName })

  //   expect(validators).toEqual([ new RequiredStringValidator(companyName, 'companyName')])
  // })

  // it('should return 200 if creation succeeds', async () => {
  //   const httpResponse = await sut.handle({ companyName })

  //   expect(httpResponse).toEqual({
  //     statusCode: 200,
  //     data: { companyName, id }
  //   })
  // })
})
