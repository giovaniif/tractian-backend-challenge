import { Request, RequestHandler, Response } from 'express'

import { Controller } from '@/application/controllers'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const { statusCode, data } = await controller.handle({ ...req.body, ...req.params })

    if (statusCode === 204) return res.status(204).send()

    const json = statusCode === 200 ? data : { error: data.message }

    res.status(statusCode).json(json)
  }
}
