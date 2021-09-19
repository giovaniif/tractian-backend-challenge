import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateUnitController } from '@/main/factories/controllers/unit'

export default (router: Router): void => {
  router.post('/unit', adapt(makeCreateUnitController()))
}

