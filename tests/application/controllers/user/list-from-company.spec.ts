import { ListUsersFromCompanyController } from '@/application/controllers'
import { EmailValidator, RequiredStringValidator } from '@/application/validations'

describe('List Users From Company Controller', () => {
  let sut: ListUsersFromCompanyController
  let listUsers: jest.Mock

  beforeAll(() => {
    listUsers = jest.fn()
    listUsers.mockResolvedValue([{
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_email'
    }])
  })

  beforeEach(() => {
    sut = new ListUsersFromCompanyController(listUsers)
  })
  
  it('should call list users with correct params', async () => {
    await sut.handle({ companyId: 'any_id' })

    expect(listUsers).toHaveBeenCalledWith({ companyId: 'any_id' })
    expect(listUsers).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyId: 'any_id' })

    expect(validators).toEqual([ new RequiredStringValidator('any_id', 'companyId')])
  })

  it('should return 200 if usecase performs', async () => {
    const response = await sut.handle({ companyId: 'any_id' })

    expect(response).toEqual({
      statusCode: 200,
      data: [{
        id: 'any_user_id',
        name: 'any_user_name',
        email: 'any_user_email'
      }]
    })
  })
})
