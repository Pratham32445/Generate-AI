/*
  Warnings:

  - Added the required column `failIdRequestId` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModelTrainingStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "failIdRequestId" TEXT NOT NULL,
ADD COLUMN     "status" "ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending';
