import { CreateCompanyRepository, LoadCompanyRepository } from '@/domain/contracts/repos'
import { InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'
export class CreateCompanyUseCase {
  constructor(private readonly companyRepo: CreateCompanyRepository & LoadCompanyRepository) {}

  async perform(params: Params): Promise<Result> {
    if (params.companyName === undefined || params.companyName.length < 2) return new InvalidNameError()
    
    const companyExists = await this.companyRepo.load(params)
    
    if (companyExists) return new NameAlreadyInUseError()
    
    const company = await this.companyRepo.create(params)
    return { id: company.id, companyName: company.name }
  }
}

type Params = {
  companyName: string
}

type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError
