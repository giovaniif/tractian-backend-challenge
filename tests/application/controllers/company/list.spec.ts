import { mock, MockProxy } from 'jest-mock-extended'

import { ListCompaniesUseCase } from '@/domain/usecases/company'
import { ListCompaniesController } from '@/application/controllers'

describe('List Companies Controller', () => {
  let sut: ListCompaniesController
  let listCompaniesUseCase: MockProxy<ListCompaniesUseCase>

  beforeAll(() => {
    listCompaniesUseCase = mock()
    listCompaniesUseCase.perform.mockResolvedValue([{ companyName: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListCompaniesController(listCompaniesUseCase)
  })
  
  it('should call list companies usecase', async () => {
    await sut.handle()

    expect(listCompaniesUseCase.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with company array', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ companyName: 'any_name', id: 'any_id' }]
    })
  })
})
