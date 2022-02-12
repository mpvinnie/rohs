import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import '@shared/infra/prisma'
import '@shared/containers'
import uploadConfig from '@config/upload'
import { asyncErrors } from '@shared/errors/asyncErrors'

import { appRoutes } from './routes'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/files/avatars', express.static(uploadConfig.uploadFolders.avatars))

app.use(
  '/files/documents',
  express.static(uploadConfig.uploadFolders.documents)
)

app.use('/files/subparts', express.static(uploadConfig.uploadFolders.subparts))

app.use(appRoutes)

app.use(asyncErrors)

app.listen(3333, () => {
  console.log('Server running on port 3333')
})
