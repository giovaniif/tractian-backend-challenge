import { LoadCompanyRepository } from '@/domain/contracts/repos'
export class ListCompaniesUseCase {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}
  
  async perform(): Promise<Result> {
    const companies = await this.companyRepo.loadAll()

    return companies.map(c => ({
      companyName: c.name,
      id: c.id.toString(),
    }))
  }
}

type Result = { companyName: string, id: string }[]
