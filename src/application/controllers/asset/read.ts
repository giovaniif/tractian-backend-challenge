import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { ReadAsset } from '@/domain/usecases/asset'
import { ValidationBuilder, Validator } from '@/application/validations'
import { AssetNotFoundError } from '@/domain/errors'

type Request = { assetId: string }
type Response = { 
  id: string,
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string  
} | AssetNotFoundError

export class ReadAssetController extends Controller {
  constructor(private readonly readAsset: ReadAsset) {
    super()
  }

  async perform({ assetId }: Request): Promise<HttpResponse<Response>> {
    const result = await this.readAsset({ assetId })
    if (result instanceof Error) return badRequest(result)

    return ok(result)
  }

  override buildValidators ({ assetId }: Request): Validator[] {
    const validators = ValidationBuilder.of({
      value: assetId,
      fieldName: 'assetId'
    }).required().build()
    
    return [...validators]
  }
}