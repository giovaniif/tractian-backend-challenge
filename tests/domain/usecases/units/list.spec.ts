import { MockProxy, mock } from 'jest-mock-extended'

import { LoadUnitRepository } from '@/domain/contracts/repos'
import { ListUnits, setupListUnits } from '@/domain/usecases/unit'

describe('List Units UseCase', () => {
  let sut: ListUnits
  let unitRepo: MockProxy<LoadUnitRepository>

  beforeAll(() => {
    unitRepo = mock()
    unitRepo.loadAll.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = setupListUnits(unitRepo)
  })

  it('should call loadAll', async () => {
    await sut()

    expect(unitRepo.loadAll).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadAll', async () => {
    const units = await sut()

    expect(units).toEqual([{ name: 'any_name', id: 'any_id' }])
  })
})