import { CreateAssetController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations'

const makeParams = () => {
  return {
    name: 'any_name', 
    imageUrl: 'any_image', 
    description: 'any_description', 
    model: 'any_model', 
    owner: 'any_owner', 
    status: 'any_status',
    healthLevel: 'any_level',
    unitId: 'any_unit_id' 
  }
}

describe('Create Asset Controller', () => {
  let sut: CreateAssetController
  let createAsset: jest.Mock
  const params = makeParams()

  beforeAll(() => {
    createAsset = jest.fn()
    createAsset.mockResolvedValue({})
  })

  beforeEach(() => {
    sut = new CreateAssetController(createAsset)
  })
  
  it('should call create asset with correct params', async () => {
    await sut.handle(params)

    expect(createAsset).toHaveBeenCalledWith(params)
    expect(createAsset).toHaveBeenCalledTimes(1)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators(params)

    expect(validators).toEqual([
      new RequiredStringValidator(params.name, 'name'),
      new RequiredStringValidator(params.imageUrl, 'imageUrl'),
      new RequiredStringValidator(params.description, 'description'),
      new RequiredStringValidator(params.model, 'model'),
      new RequiredStringValidator(params.owner, 'owner'),
      new RequiredStringValidator(params.status, 'status'),
      new RequiredStringValidator(params.healthLevel, 'healthLevel'),
      new RequiredStringValidator(params.unitId, 'unitId'),
    ])
  })

  it('should return 400 if usecase returns known error', async () => {
    createAsset.mockResolvedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({ statusCode: 400, data: new Error('any_error') })
  })

  it('should return 200 if usecase performs', async () => {
    createAsset.mockResolvedValueOnce({ any: 'any' })

    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({ statusCode: 200, data: { any: 'any' } })
  })
})
