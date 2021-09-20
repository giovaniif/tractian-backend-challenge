import { MockProxy, mock } from 'jest-mock-extended'

import { LoadAssetByIdRepository } from '@/domain/contracts/repos'
import { ReadAsset, setupReadAsset } from '@/domain/usecases/asset'
import { AssetNotFoundError } from '@/domain/errors'

describe('Read Asset UseCase', () => {
  let sut: ReadAsset
  let assetId: string
  let assetRepo: MockProxy<LoadAssetByIdRepository>

  beforeAll(() => {
    assetId = 'any_id'
    assetRepo = mock()
    assetRepo.loadById.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = setupReadAsset(assetRepo)
  })

  it('should call loadById with correct params', async () => {
    await sut({ assetId })

    expect(assetRepo.loadById).toHaveBeenCalledWith({ assetId })
    expect(assetRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return AssetNotFound if loadById returns undefined', async () => {
    const result = await sut({ assetId })

    expect(result).toEqual(new AssetNotFoundError())
  })

  it('should return asset data if loadById returns data', async () => {
    const fakeAsset = {
      name: 'any_name', 
      imageUrl: 'any_image', 
      description: 'any_description', 
      model: 'any_model', 
      owner: 'any_owner', 
      status: 'any_status',
      healthLevel: 'any_level',
      unitId: 'any_unit_id',
      id: 'any_id'
      }
    
    assetRepo.loadById.mockResolvedValueOnce(fakeAsset)

    const result = await sut({ assetId })

    expect(result).toEqual(fakeAsset)
  })
})