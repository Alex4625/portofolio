CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`target_id` text,
	`count` integer DEFAULT 0 NOT NULL
);
