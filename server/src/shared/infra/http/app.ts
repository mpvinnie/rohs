import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import http from 'http'
import { Server } from 'socket.io'

import '@shared/infra/prisma'
import '@shared/containers'
import uploadConfig from '@config/upload'
import { asyncErrors } from '@shared/errors/asyncErrors'

import { appRoutes } from './routes'

const app = express()

app.use(cors())

export const serverHttp = http.createServer(app)

export const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log(`User connected on socket ${socket.id}`)
})

app.use(express.json())

app.use('/files/avatars', express.static(uploadConfig.uploadFolders.avatars))

app.use(
  '/files/documents',
  express.static(uploadConfig.uploadFolders.documents)
)

app.use('/files/subparts', express.static(uploadConfig.uploadFolders.subparts))

app.use(appRoutes)

app.use(asyncErrors)
