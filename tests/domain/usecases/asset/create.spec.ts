import { mock, MockProxy } from 'jest-mock-extended'

import { CreateAsset, setupCreateAsset } from '@/domain/usecases/asset'
import { CreateAssetRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'
import { InvalidStatusError, UnitNotFoundError } from '@/domain/errors'

const makeParams = () => {
  return {
    name: 'any_name', 
    imageUrl: 'any_image', 
    description: 'any_description', 
    model: 'any_model', 
    owner: 'any_owner', 
    status: 'RUNNING',
    healthLevel: 'any_level',
    unitId: 'any_unit_id' 
  }
}

describe('Create Asset UseCase', () => {
  let sut: CreateAsset
  let unitRepo: MockProxy<LoadUnitByIdRepository>
  let assetRepo: MockProxy<CreateAssetRepository>
  const params = makeParams()

  beforeAll(() => {
    unitRepo = mock()
    unitRepo.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name' })
    assetRepo = mock()
    assetRepo.create.mockResolvedValue({ ...params, id: 'any_id' })
  })

  beforeEach(() => {
    sut = setupCreateAsset(unitRepo, assetRepo)
  })

  it('should call load unit with correct unit id', async () => {
    await sut(params)

    expect(unitRepo.loadById).toHaveBeenCalledWith({ unitId: 'any_unit_id' })
    expect(unitRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return UnitNotFoundError if loadById returns undefined', async () => {
    unitRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut(params)

    expect(result).toEqual(new UnitNotFoundError())
  })

  it('should return InvalidStatusError if status is invalid', async () => {
    const result = await sut({ ...params, status: 'invalid_status' })

    expect(result).toEqual(new InvalidStatusError())
  })

  it('should call create with correct params if loadByIf returns data', async () => {
    await sut(params)

    expect(assetRepo.create).toHaveBeenCalledWith(params)
    expect(assetRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return the created asset', async () => {
    const result = await sut(params)

    expect(result.name).toBe(params.name)
  })
})
