export namespace LoadUserByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = { id: string, name: string, email: string } | undefined
}

export interface LoadUserByEmailRepository {
  loadByEmail: (params: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>
}