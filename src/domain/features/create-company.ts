export interface CreateCompany {
  perform: (companyName: string) => Promise<any>
}
