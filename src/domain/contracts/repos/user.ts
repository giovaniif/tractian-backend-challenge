export namespace LoadUserByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = { id: string, name: string, email: string } | undefined
}

export interface LoadUserByEmailRepository {
  loadByEmail: (params: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserFromCompanyRepository {
  export type Params = {
    companyId: string
  }

  export type Result = { id: string, name: string, email: string }[]
}

export interface LoadUserFromCompanyRepository {
  load: (params: LoadUserFromCompanyRepository.Params) => Promise<LoadUserFromCompanyRepository.Result>
}

export namespace CreateUserRepository {
  export type Params = {
    email: string
    name: string
    companyId: string
  }

  export type Result = { id: string, name: string, email: string }
}

export interface CreateUserRepository {
  create: (params: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>
}
