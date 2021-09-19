import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListUnits } from '@/domain/usecases/unit'

type Response = Array<{ id: string, name: string }>

export class ListUnitsController extends Controller {
  constructor(private readonly listUnits: ListUnits) {
    super()
  }

  async perform(): Promise<HttpResponse<Response>> {
    const units = await this.listUnits()

    return ok(units)
  }
}