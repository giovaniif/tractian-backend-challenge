import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

import { Controller } from '@/application/controllers'

class ExpressRouter {
  constructor(private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controller.handle({ ...req.body })
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.data)
    }
  }
}

describe('ExpressRouter', () => {
  let controller: MockProxy<Controller>
  let req: Request
  let res: Response
  let sut: ExpressRouter

  beforeEach(() => {
    controller = mock<Controller>()
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    sut = new ExpressRouter(controller)
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' }
    })
  })
  
  it('should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with 200 and valid data', async () => {
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 400 and error', async () => {
    controller.handle.mockResolvedValue({
      statusCode: 400,
      data: new Error('any_error')
    })
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(new Error('any_error'))
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 500 and error', async () => {
    controller.handle.mockResolvedValue({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(new Error('any_error'))
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
