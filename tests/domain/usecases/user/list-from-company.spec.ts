import { mock, MockProxy } from 'jest-mock-extended'

import { LoadUserFromCompanyRepository } from '@/domain/contracts/repos'
import { ListUsers, setupListUsers } from '@/domain/usecases/user'

describe('list from company use case', () => {
  let sut: ListUsers
  let userRepo: MockProxy<LoadUserFromCompanyRepository>

  beforeEach(() => {
    userRepo = mock()
    sut = setupListUsers(userRepo)
  })

  it('should call load with correct company id', async () => {
    await sut({ companyId: 'any_id' })

    expect(userRepo.load).toHaveBeenCalledTimes(1)
    expect(userRepo.load).toHaveBeenCalledWith({ companyId: 'any_id' })
  })

  it('should return same result as repo', async () => {
    userRepo.load.mockResolvedValueOnce([{ id: 'any_id', name: 'any_name', email: 'any_email' }])
    
    const result = await sut({ companyId: 'any_id' })

    expect(result).toEqual([{ id: 'any_id', name: 'any_name', email: 'any_email' }])
  })
})