import { LoadCompanyByIdRepository, LoadCompanyRepository } from '@/data/contracts/repos'
import { InvalidNameError } from '@/domain/errors'
import { UpdateCompany } from '@/domain/features/update-company'

export class UpdateCompanyService implements UpdateCompany {
  constructor(private readonly companyRepo: LoadCompanyRepository & LoadCompanyByIdRepository) {}

  async perform(params: UpdateCompany.Params): Promise<any> {
    if (params.companyName.length < 2) return new InvalidNameError()
  }
}
