import { MockProxy, mock } from 'jest-mock-extended'

import { LoadAssetsByUnitRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'
import { LoadAssetsByUnit, setupLoadAssetsByUnit } from '@/domain/usecases/asset'
import { UnitNotFoundError } from '@/domain/errors'

const makeResult = () => {
  return {
    id: 'any_id',
    name: 'any_name', 
    imageUrl: 'any_image', 
    description: 'any_description', 
    model: 'any_model', 
    owner: 'any_owner', 
    status: 'any_status',
    healthLevel: 'any_level',
    unitId: 'any_unit_id' 
  }
}

describe('List Assets by Unit UseCase', () => {
  let sut: LoadAssetsByUnit
  let unitRepo: MockProxy<LoadUnitByIdRepository>
  let assetRepo: MockProxy<LoadAssetsByUnitRepository>

  beforeAll(() => {
    unitRepo = mock()
    assetRepo = mock()
    unitRepo.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name' })
    assetRepo.loadByUnit.mockResolvedValue([{ ...makeResult() }])
  })

  beforeEach(() => {
    sut = setupLoadAssetsByUnit(unitRepo, assetRepo)
  })

  it('should call loadUnit by id with correct id', async () => {
    await sut({ unitId: 'any_id' })

    expect(unitRepo.loadById).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(unitRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return UnitNotFound if loadUnitByid returns undefined', async () => {
    unitRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut({ unitId: 'any_id' })

    expect(result).toEqual(new UnitNotFoundError())
  })

  it('should call assets.loadByUnit with correct unit id if units.loadById returns data', async () => {
    await sut({ unitId: 'any_id' })

    expect(assetRepo.loadByUnit).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(assetRepo.loadByUnit).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadByUnit', async () => {
    const result = await sut({ unitId: 'any_id' })

    expect(result).toEqual([{ ...makeResult() }])
  })
})