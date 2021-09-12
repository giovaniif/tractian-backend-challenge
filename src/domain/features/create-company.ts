export interface CreateCompany {
  perform: (params: CreateCompany.Params) => Promise<CreateCompany.Result>
}

export namespace CreateCompany {
  export type Params = {
    companyName: string
  }

  export type Result = any
}
