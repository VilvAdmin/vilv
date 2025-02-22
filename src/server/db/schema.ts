// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  date,
  pgEnum,
  pgTable,
  time,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const typeEnum = pgEnum("type", ["Competitie", "Beker", "Vriendschappelijk"]);

export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  home_team: varchar("home_team", { length: 255 }).notNull(),
  away_team: varchar("away_team", { length: 255 }).notNull(),
  type: typeEnum("type").notNull().default("Competitie"),
});


