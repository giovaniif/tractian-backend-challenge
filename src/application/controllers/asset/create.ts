import { CreateAsset } from '@/domain/usecases/asset'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string 
}

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
} | Error

export class CreateAssetController extends Controller {
  constructor(private readonly createAsset: CreateAsset) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.createAsset(httpRequest)
    if (result instanceof Error) return badRequest(result)

    return ok(result)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of({ value: httpRequest.name, fieldName: 'name' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.imageUrl, fieldName: 'imageUrl' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.description, fieldName: 'description' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.model, fieldName: 'model' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.owner, fieldName: 'owner' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.status, fieldName: 'status' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.healthLevel, fieldName: 'healthLevel' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.unitId, fieldName: 'unitId' }).required().build(),
    ]

    return validators
  }
}