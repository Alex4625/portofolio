CREATE TABLE `educations` (
	`id` text PRIMARY KEY NOT NULL,
	`degree` text NOT NULL,
	`school` text NOT NULL,
	`year` text NOT NULL,
	`description` text NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `galleries` (
	`id` text PRIMARY KEY NOT NULL,
	`image_url` text NOT NULL,
	`caption` text,
	`order_index` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`media_url` text NOT NULL,
	`is_video` integer DEFAULT false NOT NULL,
	`tech_stack_json` text NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon_name` text NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_config` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`role` text NOT NULL,
	`about` text NOT NULL,
	`avatar_url` text NOT NULL,
	`resume_url` text,
	`stats_json` text NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `social_links` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`icon_name` text NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL
);
