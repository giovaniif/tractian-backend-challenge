import { mock } from 'jest-mock-extended'

import { setupCreateUser } from '@/domain/usecases/user'
import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'

describe('Create User UseCase', () => {
  it('should call loadById with correct company id', async () => {
    const companyRepo = mock<LoadCompanyByIdRepository>()
    const sut = setupCreateUser(companyRepo)

    await sut({ companyId: 'any_id', name: 'any_name', email: 'any_email' })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId: 'any_id' })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })
})
