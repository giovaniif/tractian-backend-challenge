import { MongoDBCompanyRepository } from '@/infra/repos/mongo-db'

export const makeMongoDBCompanyRepo = (): MongoDBCompanyRepository => new MongoDBCompanyRepository()
