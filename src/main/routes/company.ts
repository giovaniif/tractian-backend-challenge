import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/infra/http'
import { 
  makeCreateCompanyController, 
  makeReadCompanyController, 
  makeDeleteCompanyController, 
  makeListCompaniesController,
  makeUpdatedCompanyController
} from '@/main/factories/controllers/company'

export default (router: Router): void => {
  router.post('/company', adapt(makeCreateCompanyController()))
  router.get('/company/:companyId', adapt(makeReadCompanyController()))
  router.delete('/company/:companyId', adapt(makeDeleteCompanyController()))
  router.get('/company', adapt(makeListCompaniesController()))
  router.put('/company/:companyId', adapt(makeUpdatedCompanyController()))
}

