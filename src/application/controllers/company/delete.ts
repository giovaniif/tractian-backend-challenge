import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { DeleteCompany } from '@/domain/usecases/company'
import { CompanyNotFoundError } from '@/application/errors'

type Request = { companyId: string }
type Response = null | Error

export class DeleteCompanyController extends Controller {
  constructor(private readonly deleteCompany: DeleteCompany) {
    super()
  }

  async perform({ companyId }: Request): Promise<HttpResponse<Response>> {
    const result = await this.deleteCompany({ companyId })

    if (result === undefined) return badRequest(new CompanyNotFoundError())
    
    return noContent()
  }
}