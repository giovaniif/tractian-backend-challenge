import { mock, MockProxy } from 'jest-mock-extended'

import { LoadCompanyByIdRepository, CreateUnitRepository } from '@/domain/contracts/repos'
import { CreateUnit, setupCreateUnit } from '@/domain/usecases/unit'
import { CompanyNotFoundError } from '@/domain/errors'

describe('Create Unit Usecase', () => {
  let sut: CreateUnit
  let companyRepo: MockProxy<LoadCompanyByIdRepository>
  let unitRepo: MockProxy<CreateUnitRepository>

  beforeEach(() => {
    companyRepo = mock()
    companyRepo.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name' })
    unitRepo = mock()
    unitRepo.create.mockResolvedValue({ name: 'any_name', id: 'any_id' })
    sut = setupCreateUnit(companyRepo, unitRepo)
  })

  it('should call load company by id with correct id', async () => {
    await sut({ companyId: 'any_id', name: 'any_name' })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId: 'any_id' })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return company not found error if loadById returns undefined', async () => {
    companyRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut({ companyId: 'any_id', name: 'any_name' })

    expect(result).toEqual(new CompanyNotFoundError())
  })

  it('should call create unit with correct unit name', async () => {
    await sut({ companyId: 'any_id', name: 'any_name' })

    expect(unitRepo.create).toHaveBeenCalledWith({ companyId: 'any_id', name: 'any_name' })
    expect(unitRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return the created unit', async () => {
    const result = await sut({ companyId: 'any_id', name: 'any_name' })

    expect(result).toEqual({ name: 'any_name' })
  })
})