import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const coursePricingTable = pgTable("course_pricing", {
  course_slug: text("course_slug").primaryKey(),
  price: text("price").notNull(),
  price_note: text("price_note").notNull(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const faqItemsTable = pgTable("faq_items", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const contactInfoTable = pgTable("contact_info", {
  id: text("id").primaryKey().default("main"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export type CoursePricing = typeof coursePricingTable.$inferSelect;
export type FaqItem = typeof faqItemsTable.$inferSelect;
export type ContactInfo = typeof contactInfoTable.$inferSelect;
