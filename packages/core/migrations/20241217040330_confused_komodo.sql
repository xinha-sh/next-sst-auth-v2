CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"email" varchar(50),
	"password" varchar(255),
	"is_verified" boolean DEFAULT false,
	"image" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
