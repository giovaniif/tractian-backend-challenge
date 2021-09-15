import { Router } from 'express'
import { adaptExpressRoute } from '@/infra/http'
import { makeCreateCompanyController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/company', adaptExpressRoute(makeCreateCompanyController()))
}

