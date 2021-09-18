import { mock, MockProxy } from 'jest-mock-extended'

import { CreateUser, setupCreateUser } from '@/domain/usecases/user'
import { LoadCompanyByIdRepository, LoadUserByEmailRepository, CreateUserRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError, EmailAlreadyInUseError } from '@/domain/errors'

describe('Create User UseCase', () => {
  let sut: CreateUser
  let companyRepo: MockProxy<LoadCompanyByIdRepository>
  let userRepo: MockProxy<LoadUserByEmailRepository & CreateUserRepository>

  beforeEach(() => {
    companyRepo = mock()
    companyRepo.loadById.mockResolvedValue({ name: 'any_name', id: 'any_id' })
    userRepo = mock()
    userRepo.loadByEmail.mockResolvedValue(undefined)
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

  it('should call loadByEmail with correct data', async () => {
    await sut({ companyId: 'valid_id', name: 'any_name', email: 'any_email' })

    expect(userRepo.loadByEmail).toHaveBeenCalledWith({ email: 'any_email', companyId: 'valid_id' })
    expect(userRepo.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should return EmailAlreadyInUse if loadByEmail returns data', async () => {
    userRepo.loadByEmail.mockResolvedValueOnce({ name: 'any_name', email: 'any_email', id: 'any_id' })

    const result = await sut({ companyId: 'valid_id', name: 'any_name', email: 'in_use_email' })

    expect(result).toEqual(new EmailAlreadyInUseError())
  })

  it('should call create with correct data', async () => {
    await sut({ companyId: 'valid_id', name: 'any_name', email: 'valid_email' })

    expect(userRepo.create).toHaveBeenCalledWith({ companyId: 'valid_id', name: 'any_name', email: 'valid_email' })
    expect(userRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return the user if creation succeeds', async () => {
    userRepo.create.mockResolvedValue({ name: 'any_name', id: 'any_id', email: 'valid_email' })
    
    const result = await sut({ companyId: 'company_id', name: 'valid_name', email: 'valid_email' })

    expect(result).toEqual({ name: 'any_name', id: 'any_id', email: 'valid_email' })
  })
})
