import { mock, MockProxy } from 'jest-mock-extended'

import { ReadCompany } from '@/domain/features/read-company'
import { ReadCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'

describe('Read Company Controller', () => {
  let sut: ReadCompanyController
  let readCompanyService: MockProxy<ReadCompany>
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    readCompanyService = mock()
    readCompanyService.perform.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new ReadCompanyController(readCompanyService)
  })
  
  it('should call read company service with correct params', async () => {
    await sut.handle({ companyName })

    expect(readCompanyService.perform).toHaveBeenCalledWith({ companyName })
    expect(readCompanyService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ companyName })

    expect(response).toEqual({ statusCode: 200, data: { companyName, id } })
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ companyName })

    expect(response).toEqual({ statusCode: 200, data: { companyName, id } })
  })

  it('should return 400 with CompanyNotFound', async () => {
    readCompanyService.perform.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyName })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
