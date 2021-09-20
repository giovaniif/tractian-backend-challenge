import { DeleteAssetController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('delete unit controller', () => {
  let sut: DeleteAssetController
  let deleteAsset: jest.Mock

  beforeEach(() => {
    deleteAsset = jest.fn()
    deleteAsset.mockResolvedValue({ name: 'any_name' })
    sut = new DeleteAssetController(deleteAsset)
  })

  it('should call deleteAsset with correct params', async () => {
    await sut.handle({ assetId: 'any_id' })

    expect(deleteAsset).toHaveBeenCalledWith({ assetId: 'any_id' })
    expect(deleteAsset).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ assetId: 'any_id' })

    expect(validators).toEqual([new RequiredStringValidator('any_id', 'assetId')])
  })

  it('should return 400 if deleteAsset returns known error', async () => {
    deleteAsset.mockResolvedValueOnce(new Error('any_error'))
    
    const httpResponse = await sut.handle({ assetId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 400, data: new Error('any_error') })
  })

  it('should return 204 if delete succeeds', async () => {
    deleteAsset.mockResolvedValueOnce({ name: 'any_name' })
    const httpResponse = await sut.handle({ assetId: 'any_id' })

    expect(httpResponse).toEqual({ statusCode: 204, data: undefined })
  })
})