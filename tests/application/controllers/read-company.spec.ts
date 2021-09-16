import { mock, MockProxy } from 'jest-mock-extended'

import { ReadCompany } from '@/domain/features/read-company'
import { ReadCompanyController } from '@/application/controllers'

describe('Read Company Controller', () => {
  let sut: ReadCompanyController
  let readCompanyService: MockProxy<ReadCompany>
  const companyName = 'any_name'
  const id = 'any_id'

  beforeAll(() => {
    readCompanyService = mock()
    readCompanyService.perform.mockResolvedValue({ companyName, id  })
  })

  beforeEach(() => {
    sut = new ReadCompanyController(readCompanyService)
  })
  
  it('should call read company service with correct params', async () => {
    await sut.handle({ companyName })

    expect(readCompanyService.perform).toHaveBeenCalledWith({ companyName })
    expect(readCompanyService.perform).toHaveBeenCalledTimes(1)
  })
})
