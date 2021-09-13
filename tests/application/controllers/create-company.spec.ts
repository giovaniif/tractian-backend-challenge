import { mock, MockProxy } from 'jest-mock-extended'

import { CreateCompanyController } from '@/application/controllers'
import { CreateCompany } from '@/domain/features'

describe('Create Company Controller', () => {
  let sut: CreateCompanyController
  let createCompanyService: MockProxy<CreateCompany>
  const companyName = 'any_name'

  beforeAll(() => {
    createCompanyService = mock()
  })

  beforeEach(() => {
    sut = new CreateCompanyController(createCompanyService)
  })
  
  it('should call create company service with correct params', async () => {
    await sut.handle({ companyName })

    expect(createCompanyService.perform).toHaveBeenCalledWith({ companyName })
    expect(createCompanyService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if creation fails', async () => {
    createCompanyService.perform.mockResolvedValueOnce(new Error('any_creation_error'))

    const httpResponse = await sut.handle({ companyName })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_creation_error')
    })
  })
})
