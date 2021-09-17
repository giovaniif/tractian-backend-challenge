import { mocked } from 'ts-jest/utils'

import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ServerError } from '@/application/errors'
import { ValidationComposite } from '@/application/validations'

jest.mock('@/application/validations/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_value'
  }
  
  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return 400 if validation fails', async () => {
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(new Error('validation_error'))
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)
    
    const httpResponse = await sut.handle('any_value')

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('validation_error')
    })
  })
  
  it('should return 500 if perform throws', async () => {
    const error = new Error('any_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual(sut.result)
  })
})

