import { mock, MockProxy } from 'jest-mock-extended'

import { UpdateCompanyService } from '@/data/services'
import { LoadCompanyByIdRepository, LoadCompanyRepository } from '@/data/contracts/repos'
import { InvalidNameError } from '@/domain/errors'

describe('Create Company Service', () => {
  let sut: UpdateCompanyService
  let companyName: string
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository & LoadCompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyId = 'any_id'
    companyRepo = mock()
    companyRepo.load.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new UpdateCompanyService(companyRepo)
  })

  it('should return an InvalidNameError if the name length is smaller than 2', async () => {
    const error = await sut.perform({ companyName: 'a', companyId })
    
    expect(error).toEqual(new InvalidNameError())
  })

  it('should call load company with correct params', async () => {
    await sut.perform({ companyName, companyId })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
  })
})
