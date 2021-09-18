import { LoadCompanyByIdRepository, LoadCompanyRepository, UpdateCompanyRepository } from '@/data/contracts/repos'
import { CompanyNotFoundError, InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'
import { UpdateCompany } from '@/domain/features/update-company'

export class UpdateCompanyService implements UpdateCompany {
  constructor(
    private readonly companyRepo: LoadCompanyRepository & LoadCompanyByIdRepository & UpdateCompanyRepository
  ) {}

  async perform({ companyName, companyId }: UpdateCompany.Params): Promise<UpdateCompany.Result> {
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
