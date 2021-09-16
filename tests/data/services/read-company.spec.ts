import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyRepository } from '@/data/contracts/repos'
import { ReadCompany } from '@/domain/features/read-company'

class ReadCompanyService {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}

  async perform({ companyName }: ReadCompany.Params): Promise<ReadCompany.Result> {
    await this.companyRepo.load({ companyName })
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
})