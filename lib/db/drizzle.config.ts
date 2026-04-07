import { defineConfig } from "drizzle-kit";
import path from "path";

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DATABASE_URL must be set. Please add your Supabase connection string as a secret.");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
    ssl: { rejectUnauthorized: false },
  },
});
