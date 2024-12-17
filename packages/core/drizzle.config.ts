import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export const dbConnection = {
  url: `postgresql://${Resource.DB.username}:${Resource.DB.password}@${Resource.DB.host}/${Resource.DB.database}`,
};

export default defineConfig({
  casing: "snake_case",
  schemaFilter: ["public"],
  out: "./migrations",
  schema: ["./src/**/*.schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: dbConnection.url,
  },
  migrations: {
    prefix: "timestamp",
  },
});
