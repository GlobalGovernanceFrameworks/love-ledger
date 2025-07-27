CREATE TABLE `care_acts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`act_type` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`hours` real NOT NULL,
	`impact_score` integer NOT NULL,
	`location` text,
	`hearts_earned` integer,
	`leaves_earned` integer,
	`cultural_multiplier` real DEFAULT 1,
	`green_job_score` real DEFAULT 1,
	`validation_status` text DEFAULT 'pending',
	`community_weaver_id` text,
	`validated_at` integer,
	`evidence` text,
	`metadata` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`community_weaver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `hearts_balances` (
	`user_id` text PRIMARY KEY NOT NULL,
	`total_hearts` integer DEFAULT 0,
	`leaves_earned` integer DEFAULT 0,
	`monthly_hearts` integer DEFAULT 0,
	`aubi_bonus` integer DEFAULT 0,
	`love_score` real DEFAULT 0,
	`meaning_score` real DEFAULT 0,
	`connection_score` real DEFAULT 0,
	`last_updated` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'member',
	`community_id` text,
	`did_identifier` text,
	`display_name` text,
	`location` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `validation_records` (
	`id` text PRIMARY KEY NOT NULL,
	`care_act_id` text NOT NULL,
	`validator_id` text NOT NULL,
	`decision` text NOT NULL,
	`feedback` text,
	`cultural_protocol` text,
	`consensus_weight` real DEFAULT 1,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`care_act_id`) REFERENCES `care_acts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`validator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
