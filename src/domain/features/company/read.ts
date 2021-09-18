export interface ReadCompany {
  perform: (params: ReadCompany.Params) => Promise<ReadCompany.Result>
}

export namespace ReadCompany {
  export type Params = {
    companyId: string
  }

  export type Result = undefined | { companyName: string, id: string }
}
