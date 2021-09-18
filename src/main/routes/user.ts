import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateUserController, makeListUsersFromCompanyController } from '@/main/factories/controllers/user'

export default (router: Router): void => {
  router.post('/user', adapt(makeCreateUserController()))
  router.get('/user/list-from-company/:companyId', adapt(makeListUsersFromCompanyController()))
}

