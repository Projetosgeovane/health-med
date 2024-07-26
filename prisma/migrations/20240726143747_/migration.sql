/*
  Warnings:

  - You are about to drop the column `userId` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Availability` DROP FOREIGN KEY `Availability_userId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `cancellationReason` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Availability` DROP COLUMN `userId`,
    ADD COLUMN `doctorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Availability` ADD CONSTRAINT `Availability_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
