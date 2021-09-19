export interface CreateUnitRepository {
  create: (params: CreateUnitRepository.Params) => Promise<CreateUnitRepository.Result>
}

export namespace CreateUnitRepository {
  export type Params = {
    companyId: string
    name: string
  }

  export type Result = { name: string, id: string }
}