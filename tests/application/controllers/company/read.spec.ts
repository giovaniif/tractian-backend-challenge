import { ReadCompanyController } from '@/application/controllers'
import { CompanyNotFoundError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validations'

describe('Read Company Controller', () => {
  let sut: ReadCompanyController
  let readCompany: jest.Mock
  const companyName = 'any_name'
  const companyId = 'any_id'

  beforeAll(() => {
    readCompany = jest.fn()
    readCompany.mockResolvedValue({ companyName, id: companyId  })
  })

  beforeEach(() => {
    sut = new ReadCompanyController(readCompany)
  })
  
  it('should call read company usecase with correct params', async () => {
    await sut.handle({ companyId })

    expect(readCompany).toHaveBeenCalledWith({ companyId })
    expect(readCompany).toHaveBeenCalledTimes(1)
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
    readCompany.mockResolvedValueOnce(undefined)
    const response = await sut.handle({ companyId })

    expect(response).toEqual({ statusCode: 400, data: new CompanyNotFoundError() })
  })
})
