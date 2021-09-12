import { CompanyRepository } from '@/data/contracts/repos'
import { CreateCompany } from '@/domain/features'

export class CreateCompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async perform(params: CreateCompany.Params): Promise<void> {
    const companyExists = await this.companyRepo.load(params)
    
    if (!companyExists) await this.companyRepo.create(params)
  }
}
