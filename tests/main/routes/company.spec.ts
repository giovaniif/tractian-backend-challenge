import request from 'supertest'
import { getConnection } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { app } from '@/main/config/app'
import { MongoCompany } from '@/infra/entities/mongo-db'

import { makeFakeDb } from '@/tests/infra/mocks'
import { NameAlreadyInUseError } from '@/domain/errors'

describe('Company Routes', () => {
  describe('POST /company', () => {
    let mongo: MongoMemoryServer

    const createSpy = jest.fn()
    const loadSpy = jest.fn()
    jest.mock('@/infra/repos/mongo-db/company.ts', () => ({
      MongoDBCompanyRepository: jest.fn().mockReturnValue({ create: createSpy, load: loadSpy })
    }))
    
    beforeAll(async () => {
      mongo = await makeFakeDb([MongoCompany])
    })
  
    beforeEach(async () => {
      await getConnection().getMongoRepository(MongoCompany).deleteMany({})
    })
  
    afterAll(async () => {
      await getConnection().close()
      await mongo.stop()
    })

    it('should return 200 with company name and id', async () => {
      createSpy.mockResolvedValueOnce({ id: 'any_id', name: 'valid_name' })
      
      const res = await request(app).post('/api/company').send({ companyName: 'valid_name' })
      
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ id: 'any_id', companyName: 'valid_name' })
    })

    it('should return 400 with NameAlreadyInUse', async () => {
      loadSpy.mockResolvedValueOnce({ name: 'already_in_use_name', id: 'any_id' })
      const res = await request(app).post('/api/company').send({ companyName: 'invalid_name' })
      
      expect(res.status).toBe(400)
      expect(res.body).toEqual({ error: new NameAlreadyInUseError().message })
    })
  })
})