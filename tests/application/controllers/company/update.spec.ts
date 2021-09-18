import { mock, MockProxy } from 'jest-mock-extended'

import { UpdateCompanyController } from '@/application/controllers'
import { UpdateCompany } from '@/domain/features/company'
import { RequiredStringValidator } from '@/application/validations'

describe('Create Company Controller', () => {
  let sut: UpdateCompanyController
  let updateCompanyService: MockProxy<UpdateCompany>
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    updateCompanyService = mock()
    updateCompanyService.perform.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new UpdateCompanyController(updateCompanyService)
  })
  
  it('should call update company service with correct params', async () => {
    await sut.handle({ companyName, companyId: id })

    expect(updateCompanyService.perform).toHaveBeenCalledWith({ companyName, companyId: id })
    expect(updateCompanyService.perform).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyName, companyId: id })

    expect(validators).toEqual([ new RequiredStringValidator(companyName, 'companyName')])
  })

  it('should return 200 if update succeeds', async () => {
    const httpResponse = await sut.handle({ companyName, companyId: id })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { companyName, id }
    })
  })
})
