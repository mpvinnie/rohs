import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import '@shared/infra/prisma'
import '@shared/containers'

import { asyncErrors } from '@shared/errors/asyncErrors'

import { appRoutes } from './routes'

const app = express()

app.use(express.json())

app.use(appRoutes)

app.use(asyncErrors)

app.listen(3333, () => {
  console.log('Server running on port 3333')
})
