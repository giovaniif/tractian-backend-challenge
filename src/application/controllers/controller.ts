import { HttpResponse, serverError } from '@/application/helpers'

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>

  public async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (err: any) {
      return serverError(err)
    }
  }
}