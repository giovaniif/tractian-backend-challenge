import { Router, Request, Response } from 'express'

export default (router: Router): void => {
  router.post('/company', (req: Request, res: Response) => res.send({ data: 'any_data' }))
}
