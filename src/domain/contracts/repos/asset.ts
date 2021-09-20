export interface CreateAssetRepository {
  create: (params: CreateAssetRepository.Params) => Promise<CreateAssetRepository.Result>
}

export namespace CreateAssetRepository {
  export type Params = { 
    name: string, 
    imageUrl: string, 
    description: string, 
    model: string, 
    owner: string, 
    status: string,
    healthLevel: string,
    unitId: string 
  }

  export type Result = {
    id: string,
    name: string, 
    imageUrl: string, 
    description: string, 
    model: string, 
    owner: string, 
    status: string,
    healthLevel: string,
    unitId: string 
  }
}

export interface LoadAssetsByUnitRepository {
  loadByUnit: (params: LoadAssetsByUnitRepository.Params) => Promise<LoadAssetsByUnitRepository.Result>
}

export namespace LoadAssetsByUnitRepository {
  export type Params = { unitId: string }

  export type Result = Array<{
    id: string,
    name: string, 
    imageUrl: string, 
    description: string, 
    model: string, 
    owner: string, 
    status: string,
    healthLevel: string,
    unitId: string 
  }>
}

export interface DeleteAssetRepository {
  delete: (params: DeleteAssetRepository.Params) => Promise<DeleteAssetRepository.Result>
}

export namespace DeleteAssetRepository {
  export type Params = {
    assetId: string
  }

  export type Result = void
}

export interface LoadAssetByIdRepository {
  loadById: (params: LoadAssetByIdRepository.Params) => Promise<LoadAssetByIdRepository.Result>
}

export namespace LoadAssetByIdRepository {
  export type Params = {
    assetId: string
  }

  export type Result = {
    id: string,
    name: string, 
    imageUrl: string, 
    description: string, 
    model: string, 
    owner: string, 
    status: string,
    healthLevel: string,
    unitId: string 
  } | undefined
}

export interface UpdateAssetDataRepository {
  update: (params: UpdateAssetDataRepository.Params) => Promise<UpdateAssetDataRepository.Result>
}

export namespace UpdateAssetDataRepository {
  export type Params = {
    id: string,
    data: {
      name?: string, 
      imageUrl?: string, 
      description?: string, 
      model?: string, 
      owner?: string, 
      status?: string,
      healthLevel?: string,
    }
  }

  export type Result = {
    id: string,
    name: string, 
    imageUrl: string, 
    description: string, 
    model: string, 
    owner: string, 
    status: string,
    healthLevel: string,
    unitId: string 
  }
}
