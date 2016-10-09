import path from 'path'

const PROD = process.env.NODE_ENV === 'production'

export const APP_PATH = process.cwd()
export const PORT = process.env.PORT || 3000
export const DEV_HOST = process.env.DEV_HOST || 'localhost'
export const DEV_PORT = process.env.DEV_PORT || 3000
export const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'
export const PUBLIC_DIR = PROD
  ? './'
  : path.join(process.cwd(), './.build')
