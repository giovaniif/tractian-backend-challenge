import { mock, MockProxy } from 'jest-mock-extended'

import { CreateCompanyController } from '@/application/controllers'
import { CreateCompany } from '@/domain/features/company'
import { RequiredStringValidator } from '@/application/validations'

describe('Create Company Controller', () => {
  let sut: CreateCompanyController
  let createCompanyService: MockProxy<CreateCompany>
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    createCompanyService = mock()
    createCompanyService.perform.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new CreateCompanyController(createCompanyService)
  })
  
  it('should call create company service with correct params', async () => {
    await sut.handle({ companyName })

    expect(createCompanyService.perform).toHaveBeenCalledWith({ companyName })
    expect(createCompanyService.perform).toHaveBeenCalledTimes(1)
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
