export interface DeleteCompany {
  perform: (params: DeleteCompany.Params) => Promise<DeleteCompany.Result>
}

export namespace DeleteCompany {
  export type Params = {
    companyId: string
  }

  export type Result = { id: string, companyName: string } | undefined
}
