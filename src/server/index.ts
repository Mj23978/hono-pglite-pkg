import path from 'path'
import { serve } from '@hono/node-server'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { app, database } from '../server'

const PORT = 6969

async function main() {
  migrate(database, {
    migrationsFolder: path.join(__dirname, '../migrations'),
  })

  serve({
    fetch: app.fetch,
    port: PORT,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
}).then(() => {
  console.log(`🚀 Server started on port ${PORT}`)
})