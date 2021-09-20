import { DeleteAsset } from '@/domain/usecases/asset'
import { HttpResponse, badRequest, noContent } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = { assetId: string }

type Response = Error | undefined

export class DeleteAssetController extends Controller {
  constructor(private readonly deleteAsset: DeleteAsset) {
    super()
  }
  
  async perform({ assetId }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.deleteAsset({ assetId })
    if (result instanceof Error) return badRequest(result)
    
    return noContent()
  }

  override buildValidators ({ assetId }: HttpRequest): Validator[] {
    return [...ValidationBuilder.of({ value: assetId, fieldName: 'assetId' }).required().build()]
  }
}
