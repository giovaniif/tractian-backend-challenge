import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeCreateUserController } from '@/main/factories/controllers/user'

export default (router: Router): void => {
  router.post('/user', adapt(makeCreateUserController()))
}

