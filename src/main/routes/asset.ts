import { Router } from 'express'

import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateAssetController } from '@/main/factories/controllers/asset'

export default (router: Router): void => {
  router.post('/asset', adapt(makeCreateAssetController()))
}

