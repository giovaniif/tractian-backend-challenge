import { mock, MockProxy } from 'jest-mock-extended'

import { ListCompanies } from '@/domain/features/list-companies'
import { ListCompaniesController } from '@/application/controllers'

describe('List Companies Controller', () => {
  let sut: ListCompaniesController
  let listCompaniesService: MockProxy<ListCompanies>

  beforeAll(() => {
    listCompaniesService = mock()
  })

  beforeEach(() => {
    sut = new ListCompaniesController(listCompaniesService)
  })
  
  it('should call list companies service', async () => {
    await sut.handle()

    expect(listCompaniesService.perform).toHaveBeenCalledTimes(1)
  })
})
