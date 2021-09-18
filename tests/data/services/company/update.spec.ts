import { mock, MockProxy } from 'jest-mock-extended'

import { UpdateCompanyService } from '@/data/services/company'
import { LoadCompanyByIdRepository, LoadCompanyRepository, UpdateCompanyRepository } from '@/data/contracts/repos'
import { InvalidNameError, NameAlreadyInUseError, CompanyNotFoundError } from '@/domain/errors'

describe('Create Company Service', () => {
  let sut: UpdateCompanyService
  let companyName: string
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository & LoadCompanyRepository & UpdateCompanyRepository>

  beforeAll(() => {
    companyName = 'any_name'
    companyId = 'any_id'
    companyRepo = mock()
    companyRepo.load.mockResolvedValue(undefined)
    companyRepo.updateName.mockResolvedValue({ name: 'any_name', id: 'any_id' })
  })

  beforeEach(() => {
    sut = new UpdateCompanyService(companyRepo)
  })

  it('should return an InvalidNameError if the name length is smaller than 2', async () => {
    const error = await sut.perform({ companyName: 'a', companyId })
    
    expect(error).toEqual(new InvalidNameError())
  })

  it('should return CompanyNotFound if loadById returns undefined', async () => {
    companyRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    companyRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut.perform({ companyName, companyId })

    expect(result).toEqual(new CompanyNotFoundError())
  })

  it('should call load company with correct params', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    await sut.perform({ companyName, companyId })

    expect(companyRepo.load).toHaveBeenCalledWith({ companyName })
    expect(companyRepo.load).toHaveBeenCalledTimes(1)
  })


  it('should return NameAlreadyInUseError if load returns data', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    companyRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })

    const result = await sut.perform({ companyName, companyId })

    expect(result).toEqual(new NameAlreadyInUseError())
  })

  it('should call updateName with correct params', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })

    await sut.perform({ companyName, companyId })

    expect(companyRepo.updateName).toHaveBeenCalledWith({ companyName: 'any_name', companyId: 'any_id' })
    expect(companyRepo.updateName).toHaveBeenCalledTimes(1)
  })

  it('should return the updated company', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'old_name', id: 'any_id' })
    
    const newCompany = await sut.perform({ companyName, companyId })

    expect(newCompany).toEqual({
      companyName: 'any_name',
      id: 'any_id'
    })
  })
})
