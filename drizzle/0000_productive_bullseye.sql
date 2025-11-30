CREATE TABLE `family_relations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`related_user_id` text NOT NULL,
	`relation_type` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`related_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `secret_santa_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`giver_id` text NOT NULL,
	`receiver_id` text NOT NULL,
	`year` integer NOT NULL,
	`viewed_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`giver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date_of_birth` integer,
	`gender` text,
	`phone` text,
	`email` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);