import { mock, MockProxy } from 'jest-mock-extended'

import { DeleteAssetRepository, LoadAssetByIdRepository } from '@/domain/contracts/repos'
import { setupDeleteAsset, DeleteAsset } from '@/domain/usecases/asset'
import { AssetNotFoundError } from '@/domain/errors'

describe('Delete Unit UseCase', () => {
  let sut: DeleteAsset
  let repo: MockProxy<DeleteAssetRepository & LoadAssetByIdRepository>

  beforeAll(() => {
    repo = mock()
    repo.loadById.mockResolvedValue({ name: 'any_name' } as any)
  })

  beforeEach(() => {
    sut = setupDeleteAsset(repo)
  })

  it('should call repo.loadById with correct asset id', async () => {
    await sut({ assetId: 'any_id' })

    expect(repo.loadById).toHaveBeenCalledWith({ assetId: 'any_id' })
    expect(repo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return AssetNotFound if loadById returns undefined', async () => {
    repo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut({ assetId: 'any_id' })

    expect(result).toEqual(new AssetNotFoundError())
  })

  it('should call delete if loadById returns data', async () => {
    await sut({ assetId: 'any_id' })
    
    expect(repo.delete).toHaveBeenCalledWith({ assetId: 'any_id' })
    expect(repo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return the deleted asset name', async () => {
    const result = await sut({ assetId: 'any_id' })

    expect(result).toEqual({ name: 'any_name' })
  })
})
