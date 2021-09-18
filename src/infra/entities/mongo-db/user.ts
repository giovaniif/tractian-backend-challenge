import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('users')
export class MongoUser {
  @ObjectIdColumn()
  _id!: ObjectID

  @Column()
  name!: string

  @Column()
  email!: string[]

  @ObjectIdColumn()
  companyId!: ObjectID
}
