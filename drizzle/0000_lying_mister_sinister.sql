CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`img` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE INDEX `categories_index` ON `categories` (`id`);--> statement-breakpoint
CREATE TABLE `cities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country_id` text NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `cities_index` ON `cities` (`id`);--> statement-breakpoint
CREATE TABLE `countries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `countries_index` ON `countries` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `document_types` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `document_types_index` ON `document_types` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `document_types_name_unique` ON `document_types` (`name`);--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`post_id` text NOT NULL,
	`quantity` text NOT NULL,
	`price` text NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `order_item_index` ON `order_items` (`id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`buyer_id` text NOT NULL,
	`delivery` text NOT NULL,
	`payment` text NOT NULL,
	`paid` numeric NOT NULL,
	`status` text NOT NULL,
	`extra` text DEFAULT '{}' NOT NULL,
	`created` text NOT NULL,
	`driver_id` text,
	FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `orders_index` ON `orders` (`id`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`price` numeric NOT NULL,
	`extra` numeric DEFAULT '0',
	`min` integer DEFAULT 1 NOT NULL,
	`description` text,
	`seller_id` text NOT NULL,
	`udm_id` text NOT NULL,
	`quality_id` text NOT NULL,
	`product_id` text NOT NULL,
	`stand_id` text NOT NULL,
	`wholesale` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`updated` integer DEFAULT 0 NOT NULL,
	`offer` integer DEFAULT 0 NOT NULL,
	`created` text NOT NULL,
	FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`udm_id`) REFERENCES `udms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quality_id`) REFERENCES `qualities`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stand_id`) REFERENCES `stands`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `posts_index` ON `posts` (`id`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`photo` text NOT NULL,
	`code` text NOT NULL,
	`category_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `products_index` ON `products` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `code_product_unique` ON `products` (`code`);--> statement-breakpoint
CREATE TABLE `qualities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `qualities_index` ON `qualities` (`id`);--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `roles_index` ON `roles` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE TABLE `shorts` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `shorts_index` ON `shorts` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `shorts_url_unique` ON `shorts` (`url`);--> statement-breakpoint
CREATE TABLE `squares` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city_id` text NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `squares_index` ON `squares` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `squares_name_unique` ON `squares` (`name`);--> statement-breakpoint
CREATE TABLE `stands` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`seller_id` text NOT NULL,
	`warehouse_id` text NOT NULL,
	FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `stands_index` ON `stands` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stands_code_unique` ON `stands` (`code`);--> statement-breakpoint
CREATE TABLE `udms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`height` numeric DEFAULT '1' NOT NULL,
	`width` numeric DEFAULT '1' NOT NULL,
	`length` numeric DEFAULT '1' NOT NULL,
	`weight` numeric DEFAULT '1' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `udms_index` ON `udms` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`thread` text,
	`balance` numeric DEFAULT '0' NOT NULL,
	`telegram` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role_id` text NOT NULL,
	`document` text NOT NULL,
	`document_type_id` text NOT NULL,
	`created` text NOT NULL,
	`temp` text DEFAULT '{"status":"unstarted","tgStatus":"unstarted","last_message":0}' NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`document_type_id`) REFERENCES `document_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `users_index` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`driver_id` text NOT NULL,
	`type` text NOT NULL,
	`max_weight` numeric NOT NULL,
	`status` text DEFAULT 'sleeping' NOT NULL,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `warehouses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`square_id` text NOT NULL,
	FOREIGN KEY (`square_id`) REFERENCES `squares`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `warehouses_index` ON `warehouses` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `warehouses_code_unique` ON `warehouses` (`code`);