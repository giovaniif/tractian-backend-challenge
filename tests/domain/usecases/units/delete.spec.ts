import { mock, MockProxy } from 'jest-mock-extended'

import { DeleteUnitRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'
import { setupDeleteUnit, DeleteUnit } from '@/domain/usecases/unit'
import { UnitNotFoundError } from '@/domain/errors'

describe('Delete Unit UseCase', () => {
  let sut: DeleteUnit
  let repo: MockProxy<DeleteUnitRepository & LoadUnitByIdRepository>

  beforeEach(() => {
    repo = mock()
    repo.loadById.mockResolvedValue({ name: 'any_name', id: 'any_id' })
    sut = setupDeleteUnit(repo)
  })

  it('should call repo.loadUnit with correct unit id', async () => {
    await sut({ unitId: 'any_id' })

    expect(repo.loadById).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(repo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return company not found if loadUnit returns undefined', async () => {
    repo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut({ unitId: 'any_id' })

    expect(result).toEqual(new UnitNotFoundError())
  })

  it('should call delete if loadUnit returns data', async () => {
    await sut({ unitId: 'any_id' })
    
    expect(repo.delete).toHaveBeenCalledWith({ unitId: 'any_id' })
    expect(repo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return the deleted unit', async () => {
    const result = await sut({ unitId: 'any_id' })

    expect(result).toEqual({ name: 'any_name' })
  })
})
