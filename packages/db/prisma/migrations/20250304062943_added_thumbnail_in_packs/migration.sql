/*
  Warnings:

  - Added the required column `thumbnail` to the `Pack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pack" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PackPrompt" ALTER COLUMN "packId" SET DEFAULT '';
