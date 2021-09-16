export interface ReadCompany {
  perform: (params: ReadCompany.Params) => Promise<ReadCompany.Result>
}

export namespace ReadCompany {
  export type Params = {
    companyName: string
  }

  export type Result = void
}
