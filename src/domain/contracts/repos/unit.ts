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

export interface DeleteUnitRepository {
  delete: (params: DeleteUnitRepository.Params) => Promise<DeleteUnitRepository.Result>
}

export namespace DeleteUnitRepository {
  export type Params = {
    unitId: string
  }

  export type Result = void
}

export interface LoadUnitByIdRepository {
  loadById: (params: LoadUnitByIdRepository.Params) => Promise<LoadUnitByIdRepository.Result>
}

export namespace LoadUnitByIdRepository {
  export type Params = {
    unitId: string
  }

  export type Result = { name: string, id: string } | undefined
}
