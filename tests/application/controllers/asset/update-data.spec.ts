import { UpdateAssetDataController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('Update Asset Data Controller', () => {
  let sut: UpdateAssetDataController
  let updateAssetData: jest.Mock
  
  beforeAll(() => {
    updateAssetData = jest.fn()
    updateAssetData.mockResolvedValue({ assetId: 'any_id', data: { name: 'any_name' } })
  })

  beforeEach(() => {
    sut = new UpdateAssetDataController(updateAssetData)
  })
  
  it('should call update asset with correct params', async () => {
    await sut.handle({ assetId: 'any_id', data: { name: 'any_name' } })

    expect(updateAssetData).toHaveBeenCalledWith({ assetId: 'any_id', data: { name: 'any_name' } })
    expect(updateAssetData).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ assetId: 'any_id', data: {} })

    expect(validators).toEqual([ new RequiredStringValidator('any_id', 'assetId')])
  })

  it('should return 400 if usecase returns known error', async () => {
    updateAssetData.mockResolvedValueOnce(new Error('any_error'))
    
    const httpResponse = await sut.handle({ assetId: 'any_id', data: { name: 'any_name' } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })

  it('should return 200 if update succeeds', async () => {
    const httpResponse = await sut.handle({ assetId: 'any_id', data: { name: 'any_name' } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { assetId: 'any_id', data: { name: 'any_name' } }
    })
  })
})
