import { Company } from '@/domain/models'

export interface LoadCompanyRepository {
  load: (params: LoadCompanyRepository.Params) => Promise<LoadCompanyRepository.Result>
}

export namespace LoadCompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = Company | undefined
}

export interface CreateCompanyRepository {
  create: (params: CreateCompanyRepository.Params) => Promise<CreateCompanyRepository.Result>
}

export namespace CreateCompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = Company
}
