import { app } from 'electron/main'
import { join } from 'path'

export const DATABASE_PATH = join(app.getPath('userData'), 'db.sqlite')
