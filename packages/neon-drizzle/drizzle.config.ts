import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
