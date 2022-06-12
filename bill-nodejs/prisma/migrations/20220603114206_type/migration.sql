/*
  Warnings:

  - You are about to drop the column `type` on the `record` table. All the data in the column will be lost.
  - The primary key for the `recordtype` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `record` DROP COLUMN `type`,
    ADD COLUMN `recordTypeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recordtype` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_recordTypeId_fkey` FOREIGN KEY (`recordTypeId`) REFERENCES `RecordType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
