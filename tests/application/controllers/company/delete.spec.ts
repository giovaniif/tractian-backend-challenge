import { mock, MockProxy } from 'jest-mock-extended'

import { DeleteCompany } from '@/domain/features/company'
import { DeleteCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'

describe('Delete Company Controller', () => {
  let sut: DeleteCompanyController
  let deleteCompanyService: MockProxy<DeleteCompany>
  const companyId = 'any_id'

  beforeAll(() => {
    deleteCompanyService = mock()
  })

  beforeEach(() => {
    sut = new DeleteCompanyController(deleteCompanyService)
  })
  
  it('should call delete company service with correct params', async () => {
    await sut.handle({ companyId })

    expect(deleteCompanyService.perform).toHaveBeenCalledWith({ companyId })
    expect(deleteCompanyService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if service performs', async () => {
    deleteCompanyService.perform.mockResolvedValueOnce(null as any)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 204 })
  })

  it('should return 400 with CompanyNotFound', async () => {
    deleteCompanyService.perform.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
