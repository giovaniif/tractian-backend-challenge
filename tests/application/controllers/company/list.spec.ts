import { mock, MockProxy } from 'jest-mock-extended'

import { ListCompanies } from '@/domain/features/company'
import { ListCompaniesController } from '@/application/controllers'

describe('List Companies Controller', () => {
  let sut: ListCompaniesController
  let listCompaniesService: MockProxy<ListCompanies>

  beforeAll(() => {
    listCompaniesService = mock()
    listCompaniesService.perform.mockResolvedValue([{ companyName: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListCompaniesController(listCompaniesService)
  })
  
  it('should call list companies service', async () => {
    await sut.handle()

    expect(listCompaniesService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with company array', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ companyName: 'any_name', id: 'any_id' }]
    })
  })
})
