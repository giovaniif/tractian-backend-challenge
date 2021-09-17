import { LoadCompanyRepository } from '@/data/contracts/repos'
import { ListCompanies } from '@/domain/features/list-companies'

export class ListCompaniesService implements ListCompanies {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}
  
  async perform(): Promise<ListCompanies.Result> {
    const companies = await this.companyRepo.loadAll()

    return companies.map(c => ({
      companyName: c.name,
      id: c.id.toString(),
    }))
  }
}
