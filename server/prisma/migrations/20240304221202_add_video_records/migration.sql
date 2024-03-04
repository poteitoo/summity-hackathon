/*
  Warnings:

  - You are about to drop the column `is_playable` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "is_playable",
ADD COLUMN     "is_embedable" BOOLEAN NOT NULL DEFAULT false;
