import { LoadCompanyByIdRepository, DeleteCompanyRepository } from '@/data/contracts/repos'
import { DeleteCompany } from '@/domain/features/delete-company'

export class DeleteCompanyService {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository & DeleteCompanyRepository) {}

  async perform({ companyId }: DeleteCompany.Params): Promise<DeleteCompany.Result> {
    const companyExists = await this.companyRepo.loadById({ companyId })

    if (!companyExists) {
      return undefined
    }
    
    await this.companyRepo.delete({ companyId })
  }
}
