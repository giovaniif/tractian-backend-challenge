import { UpdateCompanyController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'
import { InvalidNameError } from '@/domain/errors'

describe('Create Company Controller', () => {
  let sut: UpdateCompanyController
  let updateCompanyUseCase: jest.Mock
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    updateCompanyUseCase = jest.fn()
    updateCompanyUseCase.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new UpdateCompanyController(updateCompanyUseCase)
  })
  
  it('should call update company usecase with correct params', async () => {
    await sut.handle({ companyName, companyId: id })

    expect(updateCompanyUseCase).toHaveBeenCalledWith({ companyName, companyId: id })
    expect(updateCompanyUseCase).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ companyName, companyId: id })

    expect(validators).toEqual([ new RequiredStringValidator(companyName, 'companyName')])
  })

  it('should return 400 if usecase returns known error', async () => {
    updateCompanyUseCase.mockResolvedValueOnce(new InvalidNameError())
    
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
