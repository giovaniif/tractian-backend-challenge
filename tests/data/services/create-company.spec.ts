import { CompanyRepository } from "@/data/contracts/repos"
import { CreateCompanyService } from '@/data/services'

class CompanyRepositorySpy implements CompanyRepository {
  companyName?: string
  
  async create (params: CompanyRepository.Params): Promise<CompanyRepository.Result> {
    this.companyName = params.companyName
  }

}

describe('Create Company Service', () => {
  it('should call create company with correct params', async () => {
    const companyRepo = new CompanyRepositorySpy()
    const sut = new CreateCompanyService(companyRepo)

    await sut.perform({ companyName: 'any_name' })

    expect(companyRepo.companyName).toBe('any_name')
  })
})
