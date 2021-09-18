import { mock, MockProxy } from 'jest-mock-extended'

import { DeleteCompanyUseCase } from '@/domain/usecases/company'
import { DeleteCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'

describe('Delete Company Controller', () => {
  let sut: DeleteCompanyController
  let deleteCompanyUseCase: MockProxy<DeleteCompanyUseCase>
  const companyId = 'any_id'

  beforeAll(() => {
    deleteCompanyUseCase = mock()
  })

  beforeEach(() => {
    sut = new DeleteCompanyController(deleteCompanyUseCase)
  })
  
  it('should call delete company usecase with correct params', async () => {
    await sut.handle({ companyId })

    expect(deleteCompanyUseCase.perform).toHaveBeenCalledWith({ companyId })
    expect(deleteCompanyUseCase.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if service performs', async () => {
    deleteCompanyUseCase.perform.mockResolvedValueOnce(null as any)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 204 })
  })

  it('should return 400 with CompanyNotFound', async () => {
    deleteCompanyUseCase.perform.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
