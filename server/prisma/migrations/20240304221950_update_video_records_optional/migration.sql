-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "download_status" DROP NOT NULL,
ALTER COLUMN "is_public" DROP NOT NULL,
ALTER COLUMN "is_embedable" DROP NOT NULL;
