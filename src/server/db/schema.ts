// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import exp from "constants";
import { relations } from "drizzle-orm";
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

export const statusEnum = pgEnum("status", ["Beschikbaar", "Niet beschikbaar", "Geblesseerd"]);

export const availabilities = pgTable("availabilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  game_id: uuid("game_id").notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  status: statusEnum("status"),
});

export const gamesRelations = relations(games, ({ many }) => ({
	availabilities: many(availabilities),
}));

export const availabilitiesRelations = relations(availabilities, ({ one }) => ({
	author: one(games, {
		fields: [availabilities.game_id],
		references: [games.id],
	}),
}));