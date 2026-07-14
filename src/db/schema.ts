import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const siteConfig = sqliteTable("site_config", {
  id: text("id").primaryKey(), // We'll just use a single row id like 'main'
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  about: text("about").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  resumeUrl: text("resume_url"),
  contactEmail: text("contact_email"),
  whatsappNumber: text("whatsapp_number"),
  githubUrl: text("github_url"),
  instagramUrl: text("instagram_url"),
  linkedinUrl: text("linkedin_url"),
  youtubeUrl: text("youtube_url"),
  // Storing simple JSON string for the 3 bento grid stats
  statsJson: text("stats_json").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const educations = sqliteTable("educations", {
  id: text("id").primaryKey(), // uuid
  degree: text("degree").notNull(),
  school: text("school").notNull(),
  year: text("year").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(), // uuid
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(), // 'code', 'layout', 'message-square'
  orderIndex: integer("order_index").notNull().default(0),
});

export const portfolios = sqliteTable("portfolios", {
  id: text("id").primaryKey(), // uuid
  title: text("title").notNull(),
  description: text("description").notNull(),
  mediaUrl: text("media_url").notNull(),
  projectUrl: text("project_url"), // Optional field
  isVideo: integer("is_video", { mode: "boolean" }).notNull().default(false),
  techStackJson: text("tech_stack_json").notNull(), // Storing array of strings as JSON
  orderIndex: integer("order_index").notNull().default(0),
});

export const galleries = sqliteTable("galleries", {
  id: text("id").primaryKey(), // uuid
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  orderIndex: integer("order_index").notNull().default(0),
});

export const socialLinks = sqliteTable("social_links", {
  id: text("id").primaryKey(), // uuid
  name: text("name").notNull(),
  url: text("url").notNull(),
  iconName: text("icon_name").notNull(), // 'instagram', 'youtube', 'linkedin'
  orderIndex: integer("order_index").notNull().default(0),
});
