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
}