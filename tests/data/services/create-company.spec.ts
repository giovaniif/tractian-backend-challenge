import { CreateCompany } from '@/domain/features'

class CreateCompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async perform(params: CreateCompany.Params): Promise<void> {
    await this.companyRepo.create(params)
  }
}

interface CompanyRepository {
  create: (params: CompanyRepository.Params) => Promise<CompanyRepository.Result>
}

export namespace CompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = void
}

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
