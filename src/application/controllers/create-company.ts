import { CreateCompany } from '@/domain/features'

type HttpRequest = {
  companyName: string
}

export class CreateCompanyController {
  constructor(private readonly service: CreateCompany) {}
  
  async handle(httpRequest: HttpRequest) {
    await this.service.perform({ companyName: httpRequest.companyName })
  }
}