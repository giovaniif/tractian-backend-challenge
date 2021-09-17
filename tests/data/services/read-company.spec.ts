import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyByIdRepository } from '@/data/contracts/repos'
import { ReadCompanyService } from '@/data/services'


describe('Read Company Service', () => {
  let sut: ReadCompanyService
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository>

  beforeAll(() => {
    companyId = 'any_id'
    companyRepo = mock()
    companyRepo.loadById.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new ReadCompanyService(companyRepo)
  })

  it('should call loadById company with correct params', async () => {
    await sut.perform({ companyId })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return undefined if loadById returns undefined', async () => {
    const response = await sut.perform({ companyId })

    expect(response).toBeUndefined()
  })

  it('should return company data if loadById returns data', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    const response = await sut.perform({ companyId })

    expect(response).toEqual({ companyName: 'any_name', id: 'any_id' })
  })
})