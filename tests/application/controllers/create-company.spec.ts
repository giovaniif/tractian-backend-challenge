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
})
