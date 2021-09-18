import { ListUsers } from '@/domain/usecases/user'
import { HttpResponse, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  companyId: string
}

type Response = Array<{ id: string, name: string, email: string }>

export class ListUsersFromCompanyController extends Controller {
  constructor(private readonly listFromCompany: ListUsers) {
    super()
  }
  
  async perform({ companyId }: HttpRequest): Promise<HttpResponse<Response>> {
    const users = await this.listFromCompany({ companyId })
    return ok(users)
  }

  override buildValidators ({ companyId }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of({
        value: companyId,
        fieldName: 'companyId'
      }).required().build(),
    ]
    
    return [...validators]
  }
}
