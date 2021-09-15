import { getMongoRepository } from 'typeorm'

import { CreateCompanyRepository, LoadCompanyRepository } from '@/data/contracts/repos'
import { MongoCompany } from '@/infra/entities/mongo-db'

type LoadParams = LoadCompanyRepository.Params
type LoadResult = LoadCompanyRepository.Result

type CreateParams = CreateCompanyRepository.Params
type CreateResult = CreateCompanyRepository.Result

export class MongoDBCompanyRepository implements CreateCompanyRepository, LoadCompanyRepository {
  async load (params: LoadParams): Promise<LoadResult> {
    const repo = getMongoRepository(MongoCompany)

    const company = await repo.findOne({ where: { name: params.companyName } })
    if (!company) return undefined

    return company
  }

  async create(params: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoCompany)
    const company = repo.create({ name: params.companyName })
    await repo.save(company)
    return company
  }
}