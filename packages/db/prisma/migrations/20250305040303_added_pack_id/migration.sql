/*
  Warnings:

  - You are about to drop the column `packId` on the `OutputImagesWithoutModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "packId" TEXT;

-- AlterTable
ALTER TABLE "OutputImagesWithoutModel" DROP COLUMN "packId";
