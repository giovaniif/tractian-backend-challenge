import { LoadCompanyByIdRepository, LoadCompanyRepository, UpdateCompanyRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError, InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepo: LoadCompanyRepository & LoadCompanyByIdRepository & UpdateCompanyRepository
  ) {}

  async perform({ companyName, companyId }: Params): Promise<Result> {
    if (companyName.length < 2) return new InvalidNameError()

    const companyExists = await this.companyRepo.loadById({ companyId })
    if (!companyExists) return new CompanyNotFoundError()

    const nameAlreadyInUse = await this.companyRepo.load({ companyName })
    if (nameAlreadyInUse) return new NameAlreadyInUseError()

    const company = await this.companyRepo.updateName({ companyId, companyName })
    return {
      companyName: company.name,
      id: company.id
    }
  }
}

type Params = {
  companyName: string
  companyId: string
}

type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError
