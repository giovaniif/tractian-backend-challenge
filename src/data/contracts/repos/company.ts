import { Company } from '@/domain/models'

export interface CompanyRepository {
  load: (params: CompanyRepository.Params) => Promise<CompanyRepository.LoadResult>
  create: (params: CompanyRepository.Params) => Promise<CompanyRepository.CreateResult>
}

export namespace CompanyRepository {
  export type Params = {
    companyName: string
  }

  export type CreateResult = Company
  export type LoadResult = Company | undefined
}
