import { ListCompaniesController } from '@/application/controllers'

describe('List Companies Controller', () => {
  let sut: ListCompaniesController
  let listCompanies: jest.Mock

  beforeAll(() => {
    listCompanies = jest.fn()
    listCompanies.mockResolvedValue([{ companyName: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListCompaniesController(listCompanies)
  })
  
  it('should call list companies usecase', async () => {
    await sut.handle()

    expect(listCompanies).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with company array', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ companyName: 'any_name', id: 'any_id' }]
    })
  })
})
