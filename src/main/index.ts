import './config/module-alias'
import 'reflect-metadata'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

import { createConnection } from 'typeorm'

createConnection({
  type: 'mongodb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  url: env.mongoConnectUrl,
  entities: ['dist/infra/entities/mongo-db/index.js']
})
.then(() => app.listen(env.port, () => console.log(`server running at localhost:${env.port}`)))
.catch(console.error)


