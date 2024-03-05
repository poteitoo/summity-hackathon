/*
  Warnings:

  - You are about to drop the column `userId` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
