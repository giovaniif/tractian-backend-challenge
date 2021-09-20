import { UpdateAssetData } from '@/domain/usecases/asset'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  assetId: string,
  data: { 
    name?: string, 
    imageUrl?: string, 
    description?: string, 
    model?: string, 
    owner?: string, 
    status?: string,
    healthLevel?: string
  } 
}

type Response = Error | { 
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

export class UpdateAssetDataController extends Controller {
  constructor(private readonly updateAsset: UpdateAssetData) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.updateAsset(httpRequest)

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }

  override buildValidators ({ assetId }: HttpRequest): Validator[] {
    const validators = ValidationBuilder.of({
      value: assetId,
      fieldName: 'assetId'
    }).required().build()
    
    return [...validators]
  }
}