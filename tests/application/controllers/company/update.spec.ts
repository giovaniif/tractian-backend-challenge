import { mock, MockProxy } from 'jest-mock-extended'

import { UpdateCompanyController } from '@/application/controllers'
import { UpdateCompanyUseCase } from '@/domain/usecases/company'
import { RequiredStringValidator } from '@/application/validations'
import { InvalidNameError } from '@/domain/errors'

describe('Create Company Controller', () => {
  let sut: UpdateCompanyController
  let updateCompanyUseCase: MockProxy<UpdateCompanyUseCase>
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    updateCompanyUseCase = mock()
    updateCompanyUseCase.perform.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new UpdateCompanyController(updateCompanyUseCase)
  })
  
  it('should call update company usecase with correct params', async () => {
    await sut.handle({ companyName, companyId: id })

    expect(updateCompanyUseCase.perform).toHaveBeenCalledWith({ companyName, companyId: id })
    expect(updateCompanyUseCase.perform).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyName, companyId: id })

    expect(validators).toEqual([ new RequiredStringValidator(companyName, 'companyName')])
  })

  it('should return 400 if usecase returns known error', async () => {
    updateCompanyUseCase.perform.mockResolvedValueOnce(new InvalidNameError())
    
    const httpResponse = await sut.handle({ companyName, companyId: id })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidNameError()
    })
  })

  it('should return 200 if update succeeds', async () => {
    const httpResponse = await sut.handle({ companyName, companyId: id })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { companyName, id }
    })
  })
})
