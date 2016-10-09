import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'

import { log } from '../modules/LogUtils'
import { PUBLIC_DIR } from '../modules/Constants'

export default function addCoreMiddleware(server) {
  log(`PUBLIC_DIR: ${PUBLIC_DIR}`)
  if (process.env.NODE_ENV === 'production') {
    server.use(morgan('combined'))
    server.use(compression())
    server.use(express.static(PUBLIC_DIR, { maxAge: 31536000000 }))
  } else {
    server.use(morgan('dev'))
    server.use(express.static(PUBLIC_DIR))
  }

  server.use(express.static(path.join(PUBLIC_DIR, 'static')))
  server.use(bodyParser.json())
}
