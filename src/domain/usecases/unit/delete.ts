import { UnitNotFoundError } from '@/domain/errors'
import { DeleteUnitRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'

type Params = { unitId: string }
type Result = { name: string } | UnitNotFoundError

export type DeleteUnit = (params: Params) => Promise<Result>
type Setup = (unitRepo: DeleteUnitRepository & LoadUnitByIdRepository) => DeleteUnit

export const setupDeleteUnit: Setup = (unitRepo) => {
  return async ({ unitId }) => {
    const unitExists = await unitRepo.loadById({ unitId })
    if (!unitExists) return new UnitNotFoundError()

    await unitRepo.delete({ unitId })

    return { name: unitExists.name }
  }
}