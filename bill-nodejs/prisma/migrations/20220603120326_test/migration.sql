/*
  Warnings:

  - Added the required column `recordTypeId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `record` ADD COLUMN `recordTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_recordTypeId_fkey` FOREIGN KEY (`recordTypeId`) REFERENCES `RecordType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
