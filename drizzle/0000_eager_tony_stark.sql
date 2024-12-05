CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`img` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country_id` text NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `document_types` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`buyer_id` text NOT NULL,
	`delivery` text NOT NULL,
	`payment` text NOT NULL,
	`paid` numeric DEFAULT '0' NOT NULL,
	`status` text NOT NULL,
	`extra` text DEFAULT '{}' NOT NULL,
	`created` text NOT NULL,
	`driver_id` text,
	FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post_prices` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`price` numeric NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`price` numeric NOT NULL,
	`extra` numeric DEFAULT '0',
	`min` numeric DEFAULT '1' NOT NULL,
	`wholesale` numeric DEFAULT '0' NOT NULL,
	`seller_id` text NOT NULL,
	`udm_id` text NOT NULL,
	`quality_id` text NOT NULL,
	`product_id` text NOT NULL,
	`stand_id` text NOT NULL,
	`published` numeric DEFAULT '0' NOT NULL,
	`updated` numeric DEFAULT '0' NOT NULL,
	`created` text NOT NULL,
	`deleted` numeric DEFAULT '0' NOT NULL,
	FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`udm_id`) REFERENCES `udms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quality_id`) REFERENCES `qualities`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stand_id`) REFERENCES `stands`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`photo` text NOT NULL,
	`code` text NOT NULL,
	`considerations` text,
	`category_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `qualities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shorts` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `squares` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city_id` text NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `udms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`height` numeric DEFAULT '1' NOT NULL,
	`width` numeric DEFAULT '1' NOT NULL,
	`length` numeric DEFAULT '1' NOT NULL,
	`weight` numeric DEFAULT '1' NOT NULL
);
--> statement-breakpoint
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
	`temp` text NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`document_type_id`) REFERENCES `document_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE UNIQUE INDEX `categories_id_unique` ON `categories` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `cities_id_unique` ON `cities` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `countries_id_unique` ON `countries` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `document_types_id_unique` ON `document_types` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `document_types_name_unique` ON `document_types` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `order_items_id_unique` ON `order_items` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_id_unique` ON `orders` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `post_prices_id_unique` ON `post_prices` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `posts_id_unique` ON `posts` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_id_unique` ON `products` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_code_unique` ON `products` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `qualities_id_unique` ON `qualities` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles_id_unique` ON `roles` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `shorts_id_unique` ON `shorts` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `squares_id_unique` ON `squares` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `squares_name_unique` ON `squares` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `stands_id_unique` ON `stands` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stands_code_unique` ON `stands` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `udms_id_unique` ON `udms` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `vehicles_id_unique` ON `vehicles` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `warehouses_id_unique` ON `warehouses` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `warehouses_code_unique` ON `warehouses` (`code`);