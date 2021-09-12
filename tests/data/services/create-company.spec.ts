import { mock, MockProxy } from 'jest-mock-extended'

import { CompanyRepository } from '@/data/contracts/repos'
import { CreateCompanyService } from '@/data/services'
import { NameAlreadyInUseError, InvalidNameError } from '@/domain/errors'

describe('Create Company Service', () => {
  let sut: CreateCompanyService
  let companyName: string
  let companyRepo: MockProxy<CompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyRepo = mock()
    companyRepo.load.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new CreateCompanyService(companyRepo)
  })

  it('should call load company with correct params', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call create if load company returns undefined', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.create).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return a NameAlreadyInUseError if CompanyRepo.load returns data', async () => {
    companyRepo.load.mockResolvedValueOnce({
      name: 'any_name',
      units: [],
      users: [],
    })
    const error = await sut.perform({ companyName })

    expect(error).toEqual(new NameAlreadyInUseError())
  })

  it('should return an InvalidNameError if the name length is smaller than 2', async () => {
    const error = await sut.perform({ companyName: 'a' })
    
    expect(error).toEqual(new InvalidNameError())
  })
})
