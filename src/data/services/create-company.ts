import { CompanyRepository } from '@/data/contracts/repos'
import { NameAlreadyInUseError } from '@/domain/errors'
import { CreateCompany } from '@/domain/features'

export class CreateCompanyService implements CreateCompany {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async perform(params: CreateCompany.Params): Promise<any> {
    const companyExists = await this.companyRepo.load(params)
    
    if (companyExists) return new NameAlreadyInUseError()
    
    await this.companyRepo.create(params)
  }
}
