import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validations'

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>
  
  buildValidators(httpRequest: any): Validator[] {
    return []
  }

  public async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)

    try {
      return await this.perform(httpRequest)
    } catch (err: any) {
      return serverError(err)
    }
  }
  
  private validate(httpRequest: any): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}