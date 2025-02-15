import { serve } from '@hono/node-server'
import { migration } from '../database'
import { app } from './server'

const PORT = 6968

async function main() {
  await migration()
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