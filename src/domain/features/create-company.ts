import { InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'

export interface CreateCompany {
  perform: (params: CreateCompany.Params) => Promise<CreateCompany.Result>
}

export namespace CreateCompany {
  export type Params = {
    companyName: string
  }

  export type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError
}
