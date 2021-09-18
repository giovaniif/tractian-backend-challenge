import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { ReadCompanyUseCase } from '@/domain/usecases/company'
import { CompanyNotFoundError } from '@/application/errors'
import { ValidationBuilder, Validator } from '@/application/validations'

type Request = { companyId: string }
type Response = { companyName: string, id: string } | Error

export class ReadCompanyController extends Controller {
  constructor(private readonly usecase: ReadCompanyUseCase) {
    super()
  }

  async perform({ companyId }: Request): Promise<HttpResponse<Response>> {
    const company = await this.usecase.perform({ companyId })

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