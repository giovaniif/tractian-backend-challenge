import { mock, MockProxy } from 'jest-mock-extended'

import { UpdateAssetData, setupUpdateAssetData } from '@/domain/usecases/asset'
import { LoadAssetByIdRepository, UpdateAssetDataRepository } from '@/domain/contracts/repos'
import { AssetNotFoundError } from '@/domain/errors'

describe('Update Asset Data UseCase', () => {
  let sut: UpdateAssetData
  let assetRepo: MockProxy<UpdateAssetDataRepository & LoadAssetByIdRepository>
  let result = {
    id: 'any_id', 
    name: 'new_name', 
    unitId: 'any_id', 
    status: 'any_status', 
    owner: 'any_owner', 
    model: 'any_model', 
    imageUrl: 'any_url', 
    healthLevel: 'any_level', 
    description: 'any_description'
  }

  beforeAll(() => {
    assetRepo = mock()
    assetRepo.loadById.mockResolvedValue(result)
    assetRepo.update.mockResolvedValue(result)
  })

  beforeEach(() => {
    sut = setupUpdateAssetData(assetRepo)
  })

  it('should call load asset by id with correct id', async () => {
    await sut({ assetId: 'any_id', data: {} })

    expect(assetRepo.loadById).toHaveBeenCalledWith({ assetId: 'any_id' })
    expect(assetRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return AssetNotFoundError if loadById returns undefined', async () => {
    assetRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut({ assetId: 'any_id', data: {} })

    expect(result).toEqual(new AssetNotFoundError())
  })

  it('should call update with correct params', async () => {
    const result = await sut({ assetId: 'any_id', data: { name: 'any_name' } })
    console.log(result)

    expect(assetRepo.update).toHaveBeenCalledWith({ id: 'any_id', data: { name: 'any_name' } })
    expect(assetRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should return the updated asset', async () => {
    const result = await sut({ assetId: 'any_id', data: { name: 'new_name' } })

    expect(result.name).toBe('new_name')
  })
})
