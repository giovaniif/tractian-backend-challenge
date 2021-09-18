import { LoadCompanyByIdRepository, LoadCompanyRepository } from '@/data/contracts/repos'
import { CompanyNotFoundError, InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'
import { UpdateCompany } from '@/domain/features/update-company'

export class UpdateCompanyService implements UpdateCompany {
  constructor(private readonly companyRepo: LoadCompanyRepository & LoadCompanyByIdRepository) {}

  async perform({ companyName, companyId }: UpdateCompany.Params): Promise<any> {
    if (companyName.length < 2) return new InvalidNameError()

    const companyExists = await this.companyRepo.loadById({ companyId })
    if (!companyExists) return new CompanyNotFoundError()

    const nameAlreadyInUse = await this.companyRepo.load({ companyName })
    if (nameAlreadyInUse) return new NameAlreadyInUseError()
  }
}
