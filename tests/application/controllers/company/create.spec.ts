import { mock, MockProxy } from 'jest-mock-extended'

import { CreateCompanyController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'
import { CreateCompany } from '@/domain/usecases/company'

describe('Create Company Controller', () => {
  let sut: CreateCompanyController
  let createCompany: jest.Mock
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    createCompany = jest.fn()
    createCompany.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new CreateCompanyController(createCompany)
  })
  
  it('should call create company service with correct params', async () => {
    await sut.handle({ companyName })

    expect(createCompany).toHaveBeenCalledWith({ companyName })
    expect(createCompany).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyName })

    expect(validators).toEqual([ new RequiredStringValidator(companyName, 'companyName')])
  })

  it('should return 200 if creation succeeds', async () => {
    const httpResponse = await sut.handle({ companyName })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { companyName, id }
    })
  })
})
