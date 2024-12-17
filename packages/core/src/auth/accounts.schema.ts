import { createId } from "@paralleldrive/cuid2";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
	boolean,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	name: varchar({ length: 50 }),
	email: varchar({ length: 50 }),
	password: varchar({ length: 255 }),
	isVerified: boolean().default(false), // guest users should never be marked as verified
	image: varchar({ length: 255 }),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
	deletedAt: timestamp({ mode: "date" }),
});

export type AccountsTable = InferSelectModel<typeof accountsTable>;
export type AccountsTableInput = InferInsertModel<typeof accountsTable>;
