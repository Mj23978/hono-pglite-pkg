import 'dotenv/config';
import { Config } from 'drizzle-kit'

export default {
  out: `${__dirname}/migrations/`,
  schema: './database/schema/drizzle.ts',
  breakpoints: true,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
