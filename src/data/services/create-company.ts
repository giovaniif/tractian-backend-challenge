import { CompanyRepository } from '@/data/contracts/repos'
import { CreateCompany } from '@/domain/features'

export class CreateCompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async perform(params: CreateCompany.Params): Promise<void> {
    await this.companyRepo.load(params)
  }
}
