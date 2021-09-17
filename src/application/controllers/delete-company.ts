import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { DeleteCompany } from '@/domain/features/delete-company'
import { CompanyNotFoundError } from '@/application/errors'

type Request = { companyId: string }
type Response = null | Error

export class DeleteCompanyController extends Controller {
  constructor(private readonly service: DeleteCompany) {
    super()
  }

  async perform({ companyId }: Request): Promise<HttpResponse<Response>> {
    const result = await this.service.perform({ companyId })

    if (result === undefined) return badRequest(new CompanyNotFoundError())
    
    return noContent()
  }
}