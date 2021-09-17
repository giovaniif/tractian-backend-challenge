import { getMongoRepository } from 'typeorm'

import { 
  CreateCompanyRepository,
  LoadCompanyRepository, 
  LoadCompanyByIdRepository,
  DeleteCompanyRepository
} from '@/data/contracts/repos'
import { MongoCompany } from '@/infra/entities/mongo-db'

type LoadParams = LoadCompanyRepository.Params
type LoadResult = LoadCompanyRepository.Result

type LoadByIdParams = LoadCompanyByIdRepository.Params
type LoadByIdResult = LoadCompanyByIdRepository.Result

type CreateParams = CreateCompanyRepository.Params
type CreateResult = CreateCompanyRepository.Result

type DeleteParams = DeleteCompanyRepository.Params
type DeleteResult = DeleteCompanyRepository.Result

export class MongoDBCompanyRepository implements CreateCompanyRepository, LoadCompanyRepository, LoadCompanyByIdRepository, DeleteCompanyRepository  {
  async load ({ companyName }: LoadParams): Promise<LoadResult> {
    const repo = getMongoRepository(MongoCompany)

    const company = await repo.findOne({ where: { name: companyName }})
    
    if (!company) return undefined

    return { id: company.id.toString(), name: company.name }
  }

  async loadById ({ companyId }: LoadByIdParams): Promise<LoadByIdResult> {
    const repo = getMongoRepository(MongoCompany)

    const company = await repo.findOne(companyId)
    
    if (!company) return undefined

    return { id: company.id.toString(), name: company.name }
  }

  async create (params: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoCompany)
    const company = repo.create({ name: params.companyName })
    await repo.save(company)
    return { id: company.id.toString(), name: company.name }
  }

  async delete ({ companyId }: DeleteParams): Promise<DeleteResult> {
    const repo = getMongoRepository(MongoCompany)
    await repo.deleteOne({ _id: companyId })
  }
}