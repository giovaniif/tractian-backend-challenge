import { mock, MockProxy } from 'jest-mock-extended'

import { CreateCompanyRepository, LoadCompanyRepository } from '@/data/contracts/repos'
import { CreateCompanyService } from '@/data/services'
import { NameAlreadyInUseError, InvalidNameError } from '@/domain/errors'

describe('Create Company Service', () => {
  let sut: CreateCompanyService
  let companyName: string
  let companyRepo: MockProxy<CreateCompanyRepository & LoadCompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyRepo = mock()
    companyRepo.load.mockResolvedValue(undefined)
    companyRepo.create.mockResolvedValue({ name: 'any_name', units: [], users: [] })
  })

  beforeEach(() => {
    sut = new CreateCompanyService(companyRepo)
  })

  it('should call load company with correct params', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
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

  it('should call create if load company returns undefined', async () => {
    await sut.perform({ companyName })

    expect(companyRepo.create).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return the created company if service performs', async () => {
    const company = await sut.perform({ companyName })
    
    expect(company).toEqual({ name: 'any_name', units: [], users: [] })
  })
})
