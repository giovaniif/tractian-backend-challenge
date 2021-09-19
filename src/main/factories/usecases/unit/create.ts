import { CreateUnit, setupCreateUnit } from "@/domain/usecases/unit";
import { makeMongoDBCompanyRepo, makeMongoDBUnitRepo } from "@/main/factories/repos"

export const makeCreateUnitUseCase = (): CreateUnit => setupCreateUnit(makeMongoDBCompanyRepo(), makeMongoDBUnitRepo()) 
