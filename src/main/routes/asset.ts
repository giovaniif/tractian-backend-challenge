import { Router } from 'express'

import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateAssetController, makeLoadAssetsByUnitController, makeDeleteAssetController, makeReadAssetController, makeUpdateAssetDataController } from '@/main/factories/controllers/asset'

export default (router: Router): void => {
  router.post('/asset', adapt(makeCreateAssetController()))
  router.get('/asset/load-by-unit/:unitId', adapt(makeLoadAssetsByUnitController()))
  router.delete('/asset/:assetId', adapt(makeDeleteAssetController()))
  router.get('/asset/:assetId', adapt(makeReadAssetController()))
  router.put('/asset/:assetId', adapt(makeUpdateAssetDataController()))
}

