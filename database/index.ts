import { PGlite } from '@electric-sql/pglite';
import { drizzle, PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import path from 'path';


const globalForPrisma = globalThis as unknown as {
  database: (PgliteDatabase<Record<string, never>> & { $client: PGlite; }) | undefined;
};

// Check if an instance already exists; if not, create one
export const database = globalForPrisma.database ?? drizzle({ connection: { dataDir: '.cache/' } });

// In development, reuse the same instance to avoid creating too many connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.database = database;
}

export async function migration() {
  console.log(`🚀 Running migrations...`)
  await migrate(database as any, {
    migrationsFolder: path.join(__dirname, './migrations'),
  })
  console.log(`🚀 Migrations complete!`)
}

export * from './schema';
export * from './schema/drizzle';
