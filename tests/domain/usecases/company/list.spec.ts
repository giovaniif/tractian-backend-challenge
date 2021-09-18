import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyRepository } from '@/domain/contracts/repos'
import { ListCompanies, setupListCompanies } from '@/domain/usecases/company'

describe('List Companies UseCase', () => {
  let sut: ListCompanies
  let companyRepo: MockProxy<LoadCompanyRepository>

  beforeAll(() => {
    companyRepo = mock()
    companyRepo.loadAll.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = setupListCompanies(companyRepo)
  })

  it('should call loadAll', async () => {
    await sut()

    expect(companyRepo.loadAll).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadAll', async () => {
    const companies = await sut()

    expect(companies).toEqual([{ companyName: 'any_name', id: 'any_id' }])
  })
})