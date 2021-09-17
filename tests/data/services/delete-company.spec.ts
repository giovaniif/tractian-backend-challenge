import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyByIdRepository } from '@/data/contracts/repos'
import { DeleteCompanyService } from '@/data/services'

describe('Delete Company Service', () => {
  let sut: DeleteCompanyService
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository>

  beforeAll(() => {
    companyId = 'any_id'
    companyRepo = mock()
  })

  beforeEach(() => {
    sut = new DeleteCompanyService(companyRepo)
  })

  it('should call loadById with correct params', async () => {
    await sut.perform({ companyId })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })
})