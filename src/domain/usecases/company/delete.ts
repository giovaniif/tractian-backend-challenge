import { LoadCompanyByIdRepository, DeleteCompanyRepository } from '@/domain/contracts/repos'

export class DeleteCompanyUseCase {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository & DeleteCompanyRepository) {}

  async perform({ companyId }: Params): Promise<Result> {
    const companyExists = await this.companyRepo.loadById({ companyId })

    if (!companyExists) {
      return undefined
    }
    
    await this.companyRepo.delete({ companyId })
    return { id: companyExists.id, companyName: companyExists.name }
  }
}

type Params = {
  companyId: string
}

type Result = { id: string, companyName: string } | undefined
