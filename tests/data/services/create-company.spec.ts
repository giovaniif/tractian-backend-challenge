import { mock } from 'jest-mock-extended'

import { CompanyRepository } from '@/data/contracts/repos'
import { CreateCompanyService } from '@/data/services'

describe('Create Company Service', () => {
  it('should call create company with correct params', async () => {
    const companyRepo = mock<CompanyRepository>()
    const sut = new CreateCompanyService(companyRepo)

    await sut.perform({ companyName: 'any_name' })

    expect(companyRepo.create).toHaveBeenCalledWith({ companyName: 'any_name' })
    expect(companyRepo.create).toHaveBeenCalledTimes(1)
  })
})
