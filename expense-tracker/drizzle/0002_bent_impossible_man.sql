DO $$ BEGIN
 CREATE TYPE "public"."mood" AS ENUM('Food', 'Goods', 'Entertainment', 'Transport', 'Rent', 'Training', 'Exercise');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "category" "mood";