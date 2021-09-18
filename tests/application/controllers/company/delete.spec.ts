import { DeleteCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'

describe('Delete Company Controller', () => {
  let sut: DeleteCompanyController
  let deleteCompany: jest.Mock
  const companyId = 'any_id'

  beforeAll(() => {
    deleteCompany = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteCompanyController(deleteCompany)
  })
  
  it('should call delete company usecase with correct params', async () => {
    await sut.handle({ companyId })

    expect(deleteCompany).toHaveBeenCalledWith({ companyId })
    expect(deleteCompany).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if service performs', async () => {
    deleteCompany.mockResolvedValueOnce(null as any)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 204 })
  })

  it('should return 400 with CompanyNotFound', async () => {
    deleteCompany.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
