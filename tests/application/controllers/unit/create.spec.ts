import { CreateUnitController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('create unit controller', () => {
  let sut: CreateUnitController
  let createUnit: jest.Mock

  beforeEach(() => {
    createUnit = jest.fn()
    createUnit.mockResolvedValue({ name: 'any_name' })
    sut = new CreateUnitController(createUnit)
  })

  it('should call createUnit with correct params', async () => {
    await sut.handle({ companyId: 'any_id', name: 'any_name' })

    expect(createUnit).toHaveBeenCalledWith({ companyId: 'any_id', name: 'any_name' })
    expect(createUnit).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ companyId: 'any_id', name: 'any_name' })

    expect(validators).toEqual([
      new RequiredStringValidator('any_id', 'companyId'),
      new RequiredStringValidator('any_name', 'name')
    ])
  })

  it('should return 400 if createUnit returns known error', async () => {
    createUnit.mockResolvedValueOnce(new Error('any_error'))
    
    const httpResponse = await sut.handle({ companyId: 'any_id', name: 'any_name' })

    expect(httpResponse).toEqual({ statusCode: 400, data: new Error('any_error') })
  })

  it('should return 200 if creation succeeds', async () => {
    const httpResponse = await sut.handle({ companyId: 'any_id', name: 'any_name' })

    expect(httpResponse).toEqual({ statusCode: 200, data: { name: 'any_name' } })
  })
})