import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { DeleteCompanyUseCase } from '@/domain/usecases/company'
import { CompanyNotFoundError } from '@/application/errors'

type Request = { companyId: string }
type Response = null | Error

export class DeleteCompanyController extends Controller {
  constructor(private readonly usecase: DeleteCompanyUseCase) {
    super()
  }

  async perform({ companyId }: Request): Promise<HttpResponse<Response>> {
    const result = await this.usecase.perform({ companyId })

    if (result === undefined) return badRequest(new CompanyNotFoundError())
    
    return noContent()
  }
}