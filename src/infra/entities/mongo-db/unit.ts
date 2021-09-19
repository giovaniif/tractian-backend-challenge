import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('units')
export class MongoUnit {
  @ObjectIdColumn()
  _id!: ObjectID

  @Column()
  name!: string

  @ObjectIdColumn()
  companyId!: ObjectID
}
