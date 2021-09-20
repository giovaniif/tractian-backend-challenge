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
