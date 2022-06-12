/*
  Warnings:

  - You are about to drop the `_recordtorecordtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recordtype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_recordtorecordtype` DROP FOREIGN KEY `_RecordToRecordType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_recordtorecordtype` DROP FOREIGN KEY `_RecordToRecordType_B_fkey`;

-- AlterTable
ALTER TABLE `record` ADD COLUMN `typeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_recordtorecordtype`;

-- DropTable
DROP TABLE `recordtype`;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `belong` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
