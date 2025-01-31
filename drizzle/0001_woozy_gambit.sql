CREATE TABLE `places_banned` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `places_banned_index` ON `places_banned` (`id`);