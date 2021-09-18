import { InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'

export interface UpdateCompany {
  perform: (params: UpdateCompany.Params) => Promise<UpdateCompany.Result>
}

export namespace UpdateCompany {
  export type Params = {
    companyName: string
    companyId: string
  }

  export type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError
}
