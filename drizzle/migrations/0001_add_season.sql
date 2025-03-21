ALTER TABLE "games" 
ADD COLUMN "season" varchar(9) NOT NULL DEFAULT '2024-2025';

-- After adding with default, remove the default constraint
ALTER TABLE "games" 
ALTER COLUMN "season" DROP DEFAULT;