import { mock, MockProxy } from 'jest-mock-extended'

import { ReadCompany } from '@/domain/features/read-company'
import { ReadCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'

describe('Read Company Controller', () => {
  let sut: ReadCompanyController
  let readCompanyService: MockProxy<ReadCompany>
  const companyName = 'any_name'
  const companyId = 'any_id'

  beforeAll(() => {
    readCompanyService = mock()
    readCompanyService.perform.mockResolvedValue({ companyName, id: companyId  })
  })

  beforeEach(() => {
    sut = new ReadCompanyController(readCompanyService)
  })
  
  it('should call read company service with correct params', async () => {
    await sut.handle({ companyId })

    expect(readCompanyService.perform).toHaveBeenCalledWith({ companyId })
    expect(readCompanyService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 200, data: { companyName, id: companyId } })
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ companyName })

    expect(response).toEqual({ statusCode: 200, data: { companyName, id: companyId } })
  })

  it('should return 400 with CompanyNotFound', async () => {
    readCompanyService.perform.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyName })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
