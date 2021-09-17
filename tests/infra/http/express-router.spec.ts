import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

import { Controller } from '@/application/controllers'
import { adaptExpressRoute } from '@/infra/http'

describe('ExpressRouter', () => {
  let controller: MockProxy<Controller>
  let req: Request
  let res: Response
  let sut: RequestHandler
  let next: NextFunction

  beforeEach(() => {
    controller = mock<Controller>()
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    sut = adaptExpressRoute(controller)
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' }
    })
  })
  
  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with 200 and valid data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 204 and no data', async () => {
    controller.handle.mockResolvedValue({
      statusCode: 204,
      data: null,
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).not.toHaveBeenCalled()
  })

  it('should respond with 400 and error', async () => {
    controller.handle.mockResolvedValue({
      statusCode: 400,
      data: new Error('any_error')
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error'})
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 500 and error', async () => {
    controller.handle.mockResolvedValue({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
