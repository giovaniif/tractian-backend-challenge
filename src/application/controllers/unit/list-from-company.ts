import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validations'
import { ListUnitsFromCompany } from '@/domain/usecases/unit'

type HttpRequest = { companyId: string }
type Response = Array<{ id: string, name: string }>

export class ListUnitsFromCompanyController extends Controller {
  constructor(private readonly listUnitsFromCompany: ListUnitsFromCompany) {
    super()
  }

  async perform({ companyId }: HttpRequest): Promise<HttpResponse<Response>> {
    const units = await this.listUnitsFromCompany({ companyId })

    return ok(units)
  }

  override buildValidators({ companyId }: HttpRequest): Validator[] {
    return [...ValidationBuilder.of({ value: companyId, fieldName: 'companyId'}).required().build()]
  }
}