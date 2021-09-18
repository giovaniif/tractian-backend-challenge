import { LoadCompanyRepository } from '@/domain/contracts/repos'
import { ListCompanies } from '@/domain/features/company'

export class ListCompaniesUseCase implements ListCompanies {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}
  
  async perform(): Promise<ListCompanies.Result> {
    const companies = await this.companyRepo.loadAll()

    return companies.map(c => ({
      companyName: c.name,
      id: c.id.toString(),
    }))
  }
}
