/*
  Warnings:

  - You are about to drop the column `authorAvatar` on the `Editorial` table. All the data in the column will be lost.
  - You are about to drop the column `authorBio` on the `Editorial` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Editorial` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Editorial` table without a default value. This is not possible if the table is not empty.

*/

-- First, create a temporary admin user if none exists for existing editorials
INSERT INTO "User" (id, username, email, "firstName", "lastName", "clerkid", "displayName", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  'editorial_admin',
  'admin@am-t.com',
  'Editorial',
  'Admin',
  'editorial_admin_clerk_id',
  'Editorial Admin',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "User" WHERE email = 'admin@am-t.com'
);

-- Add the authorId column with a temporary default
ALTER TABLE "Editorial" ADD COLUMN "authorId" UUID;

-- Set authorId for existing editorials to the admin user
UPDATE "Editorial" 
SET "authorId" = (SELECT id FROM "User" WHERE email = 'admin@am-t.com' LIMIT 1)
WHERE "authorId" IS NULL;

-- Now make the column NOT NULL
ALTER TABLE "Editorial" ALTER COLUMN "authorId" SET NOT NULL;

-- Add other modifications
ALTER TABLE "Editorial" 
DROP COLUMN "authorAvatar",
DROP COLUMN "authorBio",
DROP COLUMN "authorName",
ADD COLUMN "isStaffPicked" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "published" SET DEFAULT true;

-- Mark existing editorials as staff picked
UPDATE "Editorial" SET "isStaffPicked" = true;

-- AddForeignKey
ALTER TABLE "Editorial" ADD CONSTRAINT "Editorial_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
