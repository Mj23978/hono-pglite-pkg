import { migrate } from "drizzle-orm/pglite/migrator"
import { database } from "."
import path from "path";

migrate(database, {
  migrationsFolder: path.join(__dirname, '../migrations'),
}).then(() => console.log("Database migrated successfully"));
