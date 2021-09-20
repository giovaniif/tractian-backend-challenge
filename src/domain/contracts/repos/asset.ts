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
