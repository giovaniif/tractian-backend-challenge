import { DeleteUnitController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('delete unit controller', () => {
  let sut: DeleteUnitController
  let deleteUnit: jest.Mock

  beforeEach(() => {
    deleteUnit = jest.fn()
    deleteUnit.mockResolvedValue({ name: 'any_name' })
    sut = new DeleteUnitController(deleteUnit)
  })

  it('should call createUnit with correct params', async () => {
    await sut.handle({ unitId: 'any_id' })

    expect(deleteUnit).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(deleteUnit).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ unitId: 'any_id' })

    expect(validators).toEqual([new RequiredStringValidator('any_id', 'unitId')])
  })

  it('should return 400 if deleteUnit returns known error', async () => {
    deleteUnit.mockResolvedValueOnce(new Error('any_error'))
    
    const httpResponse = await sut.handle({ unitId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 400, data: new Error('any_error') })
  })

  it('should return 204 if delete succeeds', async () => {
    deleteUnit.mockResolvedValueOnce({ name: 'any_name' })
    const httpResponse = await sut.handle({ unitId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 204, data: undefined })
  })
})