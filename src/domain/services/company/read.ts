import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'
import { ReadCompany } from '@/domain/features/company'

export class ReadCompanyService {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository) {}

  async perform({ companyId }: ReadCompany.Params): Promise<ReadCompany.Result> {
    const company = await this.companyRepo.loadById({ companyId })

    if (company) return { companyName: company.name, id: company.id }
  }
}
