import { MockProxy, mock } from 'jest-mock-extended'

import { LoadCompanyByIdRepository, DeleteCompanyRepository } from '@/domain/contracts/repos'
import { DeleteCompanyUseCase } from '@/domain/usecases/company'

describe('Delete Company UseCase', () => {
  let sut: DeleteCompanyUseCase
  let companyId: string
  let companyRepo: MockProxy<LoadCompanyByIdRepository & DeleteCompanyRepository>

  beforeAll(() => {
    companyId = 'any_id'
    companyRepo = mock()
  })

  beforeEach(() => {
    sut = new DeleteCompanyUseCase(companyRepo)
  })

  it('should call loadById with correct params', async () => {
    await sut.perform({ companyId })

    expect(companyRepo.loadById).toHaveBeenCalledWith({ companyId })
    expect(companyRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should call delete if loadById returns data', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: companyId })

    await sut.perform({ companyId })

    expect(companyRepo.delete).toHaveBeenCalledWith({ companyId })
    expect(companyRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return undefined if company does not exists', async () => {
    companyRepo.loadById.mockResolvedValueOnce(undefined)

    const result = await sut.perform({ companyId })

    expect(result).toBeUndefined()
  })

  it('should return data if company exists', async () => {
    companyRepo.loadById.mockResolvedValueOnce({ name: 'any_name', id: companyId })

    const result = await sut.perform({ companyId })

    expect(result).toEqual({ companyName: 'any_name', id: companyId })
  })
})