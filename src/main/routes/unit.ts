import { Router } from 'express'

import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateUnitController, makeDeleteUnitController } from '@/main/factories/controllers/unit'

export default (router: Router): void => {
  router.post('/unit', adapt(makeCreateUnitController()))
  router.delete('/unit/:unitId', adapt(makeDeleteUnitController()))
}

