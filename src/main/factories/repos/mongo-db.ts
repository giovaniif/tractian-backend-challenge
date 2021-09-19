import { MongoDBCompanyRepository, MongoDBUnitRepository, MongoDBUserRepository } from '@/infra/repos/mongo-db'

export const makeMongoDBCompanyRepo = (): MongoDBCompanyRepository => new MongoDBCompanyRepository()
export const makeMongoDBUserRepo = (): MongoDBUserRepository => new MongoDBUserRepository()
export const makeMongoDBUnitRepo = (): MongoDBUnitRepository => new MongoDBUnitRepository()
