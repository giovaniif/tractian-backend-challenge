import { CompanyRepository } from '@/data/contracts/repos'
import { InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'
import { CreateCompany } from '@/domain/features'

export class CreateCompanyService implements CreateCompany {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async perform(params: CreateCompany.Params): Promise<any> {
    if (params.companyName === undefined || params.companyName.length < 2) return new InvalidNameError()
    
    const companyExists = await this.companyRepo.load(params)
    
    if (companyExists) return new NameAlreadyInUseError()
    
    await this.companyRepo.create(params)
  }
}
