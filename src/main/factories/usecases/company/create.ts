import { CreateCompany, setupCreateCompany } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeCreateCompanyUseCase = (): CreateCompany => setupCreateCompany(makeMongoDBCompanyRepo())
