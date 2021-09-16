import { Request, RequestHandler, Response } from 'express'

import { Controller } from '@/application/controllers'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const { data, statusCode } = await controller.handle({ ...req.body })
    const json = statusCode === 200 ? data : { error: data.message }

    res.status(statusCode).json(json)
  }
}
