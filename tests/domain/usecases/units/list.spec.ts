import { MockProxy, mock } from 'jest-mock-extended'

import { LoadUnitRepository } from '@/domain/contracts/repos'
import { ListUnitsFromCompany, setupListUnitsFromCompany } from '@/domain/usecases/unit'

describe('List Units From Company UseCase', () => {
  let sut: ListUnitsFromCompany
  let unitRepo: MockProxy<LoadUnitRepository>

  beforeAll(() => {
    unitRepo = mock()
    unitRepo.loadByCompany.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = setupListUnitsFromCompany(unitRepo)
  })

  it('should call loadByCompany', async () => {
    await sut({ companyId: 'any_id' })

    expect(unitRepo.loadByCompany).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadByCompany', async () => {
    const units = await sut({ companyId: 'any_id' })

    expect(units).toEqual([{ name: 'any_name', id: 'any_id' }])
  })
})