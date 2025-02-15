import fs from 'fs';
import path from 'path';
import { serve } from '@hono/node-server'
import { migrate } from 'drizzle-orm/pglite/migrator'
import { app, database } from '../app'

const PORT = 6969

// const isPackaged = process.pkg !== undefined;
// const root = isPackaged ? 'C:\\snapshot\\local' : process.cwd();
// logFilesAndDirectories(root);

async function main() {

  await migrate(database, {
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