import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

import { Controller } from '@/application/controllers'

class ExpressRouter {
  constructor(private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
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
  })
  
  it('should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
