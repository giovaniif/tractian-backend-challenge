import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateCompanyController, makeReadCompanyController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/company', adapt(makeCreateCompanyController()))
  router.get('/company/:companyName', adapt(makeReadCompanyController()))
}

