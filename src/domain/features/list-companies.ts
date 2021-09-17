
export interface ListCompanies {
  perform: () => Promise<ListCompanies.Result>
}

export namespace ListCompanies {
  export type Result = { companyName: string, id: string }[]
}
