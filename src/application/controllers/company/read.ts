import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { ReadCompany } from '@/domain/features/company'
import { CompanyNotFoundError } from '@/application/errors'
import { ValidationBuilder, Validator } from '@/application/validations'

type Request = { companyId: string }
type Response = { companyName: string, id: string } | Error

export class ReadCompanyController extends Controller {
  constructor(private readonly service: ReadCompany) {
    super()
  }

  async perform({ companyId }: Request): Promise<HttpResponse<Response>> {
    const company = await this.service.perform({ companyId })

    if (company) return ok(company)

    return badRequest(new CompanyNotFoundError())
  }

  override buildValidators ({ companyId }: Request): Validator[] {
    const validators = ValidationBuilder.of({
      value: companyId,
      fieldName: 'companyId'
    }).required().build()
    
    return [...validators]
  }
}