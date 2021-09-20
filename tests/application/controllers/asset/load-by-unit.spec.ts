import { LoadAssetsByUnitController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('Load Assets By Unit Controller', () => {
  let sut: LoadAssetsByUnitController
  let loadAssetsByUnit: jest.Mock

  beforeAll(() => {
    loadAssetsByUnit = jest.fn()
    loadAssetsByUnit.mockResolvedValue({})
  })

  beforeEach(() => {
    sut = new LoadAssetsByUnitController(loadAssetsByUnit)
  })
  
  it('should call loadAssetsByUnit with correct params', async () => {
    await sut.handle({ unitId: 'any_id' })

    expect(loadAssetsByUnit).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(loadAssetsByUnit).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ unitId: 'any_id' })

    expect(validators).toEqual([new RequiredStringValidator('any_id', 'unitId')])
  })

  it('should return 400 if usecase returns known error', async () => {
    loadAssetsByUnit.mockResolvedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle({ unitId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 400, data: new Error('any_error') })
  })

  it('should return 200 if usecase performs', async () => {
    loadAssetsByUnit.mockResolvedValueOnce({ any: 'any' })

    const httpResponse = await sut.handle({ unitId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 200, data: { any: 'any' } })
  })
})
