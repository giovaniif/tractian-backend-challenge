import { LoadCompanyByIdRepository, DeleteCompanyRepository } from '@/domain/contracts/repos'
import { DeleteCompany } from '@/domain/features/company'

export class DeleteCompanyUseCase {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository & DeleteCompanyRepository) {}

  async perform({ companyId }: DeleteCompany.Params): Promise<DeleteCompany.Result> {
    const companyExists = await this.companyRepo.loadById({ companyId })

    if (!companyExists) {
      return undefined
    }
    
    await this.companyRepo.delete({ companyId })
    return { id: companyExists.id, companyName: companyExists.name }
  }
}
