import { ReadAssetController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('Read Company Controller', () => {
  let sut: ReadAssetController
  let assetId: string
  let readAsset: jest.Mock

  beforeAll(() => {
    assetId = 'any_id'
    readAsset = jest.fn()
    readAsset.mockResolvedValue({ any: 'any' })
  })

  beforeEach(() => {
    sut = new ReadAssetController(readAsset)
  })
  
  it('should call read asset usecase with correct params', async () => {
    await sut.handle({ assetId })

    expect(readAsset).toHaveBeenCalledWith({ assetId })
    expect(readAsset).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ assetId })

    expect(validators).toEqual([ new RequiredStringValidator(assetId, 'assetId')])
  })

  it('should return 200 with company data', async () => {
    const response = await sut.handle({ assetId })

    expect(response).toEqual({ statusCode: 200, data: { any: 'any' }})
  })

  it('should return 400 if usecase returns known error', async () => {
    readAsset.mockResolvedValueOnce(new Error('any_error'))
    const response = await sut.handle({ assetId })

    expect(response).toEqual({ statusCode: 400, data: new Error('any_error') })
  })
})
