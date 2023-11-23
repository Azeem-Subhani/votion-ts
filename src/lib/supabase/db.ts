import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migration/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("❌ - Cannot Find Database URL.");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, schema);
const migrateDatabase = async () => {
  try {
    console.log("🟢 - Migrating Database");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("🎉 - Migrated...");
  } catch (err) {
    console.log("❌ - Error Migrating Database.");
    console.log(err);
  }
};
migrateDatabase();
export default db;
