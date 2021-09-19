import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('assets')
export class MongoUnit {
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
  status!: 'RUNNING' | 'ALERTING' | 'STOPPED'

  @Column()
  healthLevel!: string

  @ObjectIdColumn()
  unitId!: ObjectID
}
