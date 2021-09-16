import { LoadCompanyRepository } from '@/data/contracts/repos'
import { ReadCompany } from '@/domain/features/read-company'

export class ReadCompanyService {
  constructor(private readonly companyRepo: LoadCompanyRepository) {}

  async perform({ companyName }: ReadCompany.Params): Promise<ReadCompany.Result> {
    const company = await this.companyRepo.load({ companyName })

    if (company) return { companyName: company.name, id: company.id }
  }
}
