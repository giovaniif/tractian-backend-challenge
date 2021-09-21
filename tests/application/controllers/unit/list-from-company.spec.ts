import { ListUnitsFromCompanyController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

describe('List Units From Company Controller', () => {
  let sut: ListUnitsFromCompanyController
  let listUnitsFromCompany: jest.Mock

  beforeAll(() => {
    listUnitsFromCompany = jest.fn()
    listUnitsFromCompany.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListUnitsFromCompanyController(listUnitsFromCompany)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ companyId: 'any_id'})

    expect(validators).toEqual([
      new RequiredStringValidator('any_id', 'companyId'),
    ])
  })
  
  it('should call list units from company usecase', async () => {
    await sut.handle({ companyId: 'any_id' })

    expect(listUnitsFromCompany).toHaveBeenCalledTimes(1)
    expect(listUnitsFromCompany).toHaveBeenCalledWith({ companyId: 'any_id' })
  })

  it('should return 200 with units array', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ name: 'any_name', id: 'any_id' }]
    })
  })
})
