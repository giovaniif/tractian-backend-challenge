import { ListUnitsController } from '@/application/controllers'

describe('List Units Controller', () => {
  let sut: ListUnitsController
  let listUnits: jest.Mock

  beforeAll(() => {
    listUnits = jest.fn()
    listUnits.mockResolvedValue([{ name: 'any_name', id: 'any_id' }])
  })

  beforeEach(() => {
    sut = new ListUnitsController(listUnits)
  })
  
  it('should call list companies usecase', async () => {
    await sut.handle()

    expect(listUnits).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with units array', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ name: 'any_name', id: 'any_id' }]
    })
  })
})
