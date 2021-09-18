import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'

export class ReadCompanyUseCase {
  constructor(private readonly companyRepo: LoadCompanyByIdRepository) {}

  async perform({ companyId }: Params): Promise<Result> {
    const company = await this.companyRepo.loadById({ companyId })

    if (company) return { companyName: company.name, id: company.id }
  }
}

export type Params = {
  companyId: string
}

export type Result = undefined | { companyName: string, id: string }
