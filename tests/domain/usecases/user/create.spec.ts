import { mock, MockProxy } from 'jest-mock-extended'

import { CreateUser, setupCreateUser } from '@/domain/usecases/user'
import { LoadCompanyByIdRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError } from '@/domain/errors'

describe('Create User UseCase', () => {
  let sut: CreateUser
  let companyRepo: MockProxy<LoadCompanyByIdRepository>
  let userRepo: MockProxy<LoadUserByEmailRepository>

  beforeEach(() => {
    companyRepo = mock()
    userRepo = mock()
    sut = setupCreateUser(companyRepo, userRepo)
  })

  it('should call loadById with correct company id', async () => {
    await sut({ companyId: 'any_id', name: 'any_name', email: 'any_email' })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId: 'any_id' })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return company not found if loadById does not return data', async () => {
    companyRepo.loadById.mockResolvedValueOnce(undefined)
    
    const result = await sut({ companyId: 'invalid_id', name: 'any_name', email: 'any_email' })

    expect(result).toEqual(new CompanyNotFoundError())
  })

  it('should call loadByEmail with correct email', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: 'any_id' })
    
    await sut({ companyId: 'valid_id', name: 'any_name', email: 'any_email' })

    expect(userRepo.loadByEmail).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userRepo.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
