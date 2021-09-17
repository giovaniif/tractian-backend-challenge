import { LoadCompanyByIdRepository } from '@/data/contracts/repos'
import { DeleteCompany } from '@/domain/features/delete-company'

export class DeleteCompanyService {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository) {}

  async perform({ companyId }: DeleteCompany.Params): Promise<DeleteCompany.Result> {
    await this.companyRepo.loadById({ companyId })
  }
}
