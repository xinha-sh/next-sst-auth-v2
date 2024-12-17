import type { LogWriter } from "drizzle-orm";
import { DefaultLogger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Resource } from "sst";
import * as AccountsSchema from "./auth/accounts.schema";

export class DbLogWriter implements LogWriter {
  write(message: string) {
    // Write to file, stdout, etc.
    console.log("**** message  ****", message);
  }
}
const logger = new DefaultLogger({ writer: new DbLogWriter() });
const connectionString = `postgres://${Resource.DB.username}:${Resource.DB.password}@${Resource.DB.host}/${Resource.DB.database}`;

export const db = drizzle(connectionString, {
  casing: "snake_case",
  logger,
  schema: { ...AccountsSchema },
});
