import cuid from "cuid";
import type { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export type Users = InferSelectModel<typeof users>;
