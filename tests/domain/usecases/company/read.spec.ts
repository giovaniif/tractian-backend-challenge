import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'
import { ReadCompany, setupReadCompany } from '@/domain/usecases/company'

describe('Read Company UseCase', () => {
  let sut: ReadCompany
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository>

  beforeAll(() => {
    companyId = 'any_id'
    companyRepo = mock()
    companyRepo.loadById.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = setupReadCompany(companyRepo)
  })

  it('should call loadById company with correct params', async () => {
    await sut({ companyId })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return undefined if loadById returns undefined', async () => {
    const response = await sut({ companyId })

    expect(response).toBeUndefined()
  })

  it('should return company data if loadById returns data', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    const response = await sut({ companyId })

    expect(response).toEqual({ companyName: 'any_name', id: 'any_id' })
  })
})