import { mock, MockProxy } from 'jest-mock-extended'

import { CreateUser, setupCreateUser } from '@/domain/usecases/user'
import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError } from '@/domain/errors'

describe('Create User UseCase', () => {
  let sut: CreateUser
  let companyRepo: MockProxy<LoadCompanyByIdRepository>

  beforeEach(() => {
    companyRepo = mock()
    sut = setupCreateUser(companyRepo)
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
})
