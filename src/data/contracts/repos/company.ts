export interface LoadCompanyRepository {
  load: (params: LoadCompanyRepository.Params) => Promise<LoadCompanyRepository.Result>
  loadAll: () => Promise<LoadCompanyRepository.LoadAllResult>
}

export namespace LoadCompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = { id: string, name: string} | undefined
  export type LoadAllResult = Array<{ id: string, name: string }>
}

export namespace LoadCompanyByIdRepository {
  export type Params = {
    companyId: string
  }

  export type Result = { id: string, name: string} | undefined
}

export interface LoadCompanyByIdRepository {
  loadById: (params: LoadCompanyByIdRepository.Params) => Promise<LoadCompanyByIdRepository.Result>
}

export interface CreateCompanyRepository {
  create: (params: CreateCompanyRepository.Params) => Promise<CreateCompanyRepository.Result>
}

export namespace CreateCompanyRepository {
  export type Params = {
    companyName: string
  }

  export type Result = { name: string, id: string }
}

export interface DeleteCompanyRepository {
  delete: (params: DeleteCompanyRepository.Params) => Promise<DeleteCompanyRepository.Result>
}

export namespace DeleteCompanyRepository {
  export type Params = {
    companyId: string
  }

  export type Result = void
}
