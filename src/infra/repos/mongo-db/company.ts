import { getMongoRepository } from 'typeorm'
import { ObjectID } from 'bson'

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

type LoadAllResult = LoadCompanyRepository.LoadAllResult

type CreateParams = CreateCompanyRepository.Params
type CreateResult = CreateCompanyRepository.Result

type DeleteParams = DeleteCompanyRepository.Params
type DeleteResult = DeleteCompanyRepository.Result

export class MongoDBCompanyRepository implements CreateCompanyRepository, LoadCompanyRepository, LoadCompanyByIdRepository, DeleteCompanyRepository  {
  async load ({ companyName }: LoadParams): Promise<LoadResult> {
    const repo = getMongoRepository(MongoCompany)

    const company = await repo.findOne({ where: { name: companyName }})
    
    if (!company) return undefined

    return { id: company._id.toString(), name: company.name }
  }

  async loadById ({ companyId }: LoadByIdParams): Promise<LoadByIdResult> {
    const repo = getMongoRepository(MongoCompany)
    const company = await repo.findOne({ where: { _id: new ObjectID(companyId) } })
    
    if (company === undefined) return undefined

    return { id: company._id.toString(), name: company.name }
  }

  async loadAll (): Promise<LoadAllResult> {
    const repo = getMongoRepository(MongoCompany)

    const companies = await repo.find()

    return companies.map(c => ({
      name: c.name,
      id: c._id.toString()
    }))
  }

  async create (params: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoCompany)
    const company = repo.create({ name: params.companyName })
    await repo.save(company)
    return { id: company._id.toString(), name: company.name }
  }

  async delete ({ companyId }: DeleteParams): Promise<DeleteResult> {
    const repo = getMongoRepository(MongoCompany)
    const companyObjectId = new ObjectID(companyId)

    await repo.deleteOne({ _id: companyObjectId })
  }
}