/*
  Warnings:

  - You are about to drop the column `failIdRequestId` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "failIdRequestId",
ADD COLUMN     "falIdRequestId" TEXT;
