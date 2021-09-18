import { mock, MockProxy } from 'jest-mock-extended'

import { ReadCompanyUseCase } from '@/domain/usecases/company'
import { ReadCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validations'

describe('Read Company Controller', () => {
  let sut: ReadCompanyController
  let readCompanyUseCase: MockProxy<ReadCompanyUseCase>
  const companyName = 'any_name'
  const companyId = 'any_id'

  beforeAll(() => {
    readCompanyUseCase = mock()
    readCompanyUseCase.perform.mockResolvedValue({ companyName, id: companyId  })
  })

  beforeEach(() => {
    sut = new ReadCompanyController(readCompanyUseCase)
  })
  
  it('should call read company usecase with correct params', async () => {
    await sut.handle({ companyId })

    expect(readCompanyUseCase.perform).toHaveBeenCalledWith({ companyId })
    expect(readCompanyUseCase.perform).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyId })

    expect(validators).toEqual([ new RequiredStringValidator(companyId, 'companyId')])
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 200, data: { companyName, id: companyId } })
  })

  it('should return 400 with CompanyNotFound', async () => {
    readCompanyUseCase.perform.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
