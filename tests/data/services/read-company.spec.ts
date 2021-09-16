import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyRepository } from '@/data/contracts/repos'
import { ReadCompany } from '@/domain/features/read-company'

class ReadCompanyService {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}

  async perform({ companyName }: ReadCompany.Params): Promise<ReadCompany.Result> {
    const company = await this.companyRepo.load({ companyName })

    if (company) return { companyName: company.name, id: company.id }
  }
}

describe('Read Company Service', () => {
  let sut: ReadCompanyService
  let companyName: string
  let companyRepo: MockProxy<LoadCompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyRepo = mock()
    companyRepo.load.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new ReadCompanyService(companyRepo)
  })

  it('should call load company with correct params', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should return undefined if load returns undefined', async () => {
    const response = await sut.perform({ companyName })

    expect(response).toBeUndefined()
  })

  it('should return company data if load returns data', async () => {
    companyRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    const response = await sut.perform({ companyName })

    expect(response).toEqual({ companyName: 'any_name', id: 'any_id' })
  })
})