-- CreateTable
CREATE TABLE "OutputImagesWithoutModel" (
    "Id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "falAiRequestId" TEXT,
    "status" "OutputImageStatusEnum" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImagesWithoutModel_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "OutputImagesWithoutModel" ADD CONSTRAINT "OutputImagesWithoutModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
