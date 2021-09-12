import { mock, MockProxy } from 'jest-mock-extended'

import { CompanyRepository } from '@/data/contracts/repos'
import { CreateCompanyService } from '@/data/services'

describe('Create Company Service', () => {
  let sut: CreateCompanyService
  let companyName: string
  let companyRepo: MockProxy<CompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyRepo = mock()
  })

  beforeEach(() => {
    sut = new CreateCompanyService(companyRepo)
  })

  it('should call load company with correct params', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
  })
})
