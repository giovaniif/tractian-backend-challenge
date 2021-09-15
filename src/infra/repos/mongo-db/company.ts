import { getMongoRepository } from 'typeorm'

import { CompanyRepository } from '@/data/contracts/repos'
import { MongoCompany } from '@/infra/entities/mongo-db'

export class MongoDBCompanyRepository  {
  async load (params: CompanyRepository.Params): Promise<CompanyRepository.LoadResult> {
    const repo = getMongoRepository(MongoCompany)

    const company = await repo.findOne({ where: { name: params.companyName } })
    if (!company) return undefined

    return company
  }

  async create(params: CompanyRepository.Params): Promise<CompanyRepository.CreateResult> {
    const repo = getMongoRepository(MongoCompany)
    const company = repo.create({ name: params.companyName })
    await repo.save(company)
    return company
  }
}