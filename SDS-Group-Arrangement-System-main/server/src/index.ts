import app from './app'
import config from './config'
import { DB } from './db/mangoDB'

/*
 * Initialise MongoDB
 * Then start server
 */
DB().then(() => {
  app.listen(config.PORT, () => {
    console.log(`[Server]: Server listening on port ${config.PORT}`)
  })
})
