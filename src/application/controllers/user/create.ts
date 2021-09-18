import { CreateUser } from '@/domain/usecases/user'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  companyId: string
  name: string
  email: string
}

type Response = Error | { id: string, name: string, email: string }

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUser) {
    super()
  }
  
  async perform({ companyId, name, email }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.createUser({ companyId, name, email })

    if (result instanceof Error) return badRequest(result)

    return ok(result)
  }

  // override buildValidators ({ companyId }: HttpRequest): Validator[] {
  //   const validators = ValidationBuilder.of({
  //     value: companyId,
  //     fieldName: 'companyId'
  //   }).required().build()
    
  //   return [...validators]
  // }
}
