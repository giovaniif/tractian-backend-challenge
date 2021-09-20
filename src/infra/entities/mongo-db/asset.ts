import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('assets')
export class MongoAsset {
  @ObjectIdColumn()
  _id!: ObjectID

  @Column()
  name!: string

  @Column()
  imageUrl!: string

  @Column()
  description!: string

  @Column()
  model!: string

  @Column()
  owner!: string

  @Column()
  status!: string

  @Column()
  healthLevel!: string

  @ObjectIdColumn()
  unitId!: ObjectID
}
