/*
  Warnings:

  - You are about to drop the column `falIdRequestId` on the `Model` table. All the data in the column will be lost.
  - Added the required column `falAIRequestId` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "falIdRequestId",
ADD COLUMN     "falAIRequestId" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAIRequestId" TEXT NOT NULL;
