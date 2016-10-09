import express from 'express'
import addCoreMiddleware from './coreMiddleware'
import router from './react-router'

import { log } from '../modules/LogUtils'
import { PORT } from '../modules/Constants'

const app = express()
app.disable('x-powered-by')

addCoreMiddleware(app)

app.use(router)

app.listen(PORT, () => {
  log(`App listening on port ${PORT}`)
})
