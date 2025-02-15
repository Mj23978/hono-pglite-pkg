import 'dotenv/config'

import { zValidator } from '@hono/zod-validator'
import { database, userSchema, users } from '../database'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { type z } from 'zod'

export const app = new Hono()

app.onError((err, ctx) => {
  if ('format' in err) {
    console.error(JSON.stringify((err as z.ZodError).format(), undefined, 2))
  } else {
    console.error(err)
  }
  return ctx.json({ error: 'Internal Server Error' }, 500)
})

app.use('*', cors())

const listUsersResponse = userSchema.array()

app.get('/users', async (ctx) => {
  const allUsers = await database.select().from(users)
  return ctx.json(listUsersResponse.parse(allUsers))
})

const insertUserRequest = userSchema.pick({
  name: true,
  email: true,
})
const insertUserResponse = userSchema

app.post('/users', zValidator('json', insertUserRequest), async (ctx) => {
  const data = ctx.req.valid('json')
  const user = await database.insert(users).values(data)
  return ctx.json(user)
})

export { database }