export interface CompanyRepository {
  create: (params: CompanyRepository.Params) => Promise<CompanyRepository.Result>
}

export namespace CompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = void
}
