import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class MongoCompany {
  @ObjectIdColumn()
  id!: ObjectID

  @Column()
  name!: string

  @Column({ type: 'array' })
  users!: object[]

  @Column({ type: 'array' })
  units!: object[]
}
