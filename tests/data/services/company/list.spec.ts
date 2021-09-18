import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyRepository } from '@/data/contracts/repos'
import { ListCompaniesService } from '@/data/services/company'


describe('List Companies Service', () => {
  let sut: ListCompaniesService
  let companyRepo: MockProxy<LoadCompanyRepository>

  beforeAll(() => {
    companyRepo = mock()
    companyRepo.loadAll.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListCompaniesService(companyRepo)
  })

  it('should call loadAll', async () => {
    await sut.perform()

    expect(companyRepo.loadAll).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadAll', async () => {
    const companies = await sut.perform()

    expect(companies).toEqual([{ companyName: 'any_name', id: 'any_id' }])
  })
})