import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('companies')
export class MongoCompany {
  @ObjectIdColumn()
  _id!: ObjectID

  @Column()
  name!: string

  @Column({ type: 'array' })
  users!: object[]

  @Column({ type: 'array' })
  units!: object[]
}
