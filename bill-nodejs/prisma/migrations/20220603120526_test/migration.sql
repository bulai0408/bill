/*
  Warnings:

  - You are about to drop the column `recordTypeId` on the `record` table. All the data in the column will be lost.
  - Added the required column `record_type_id` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `record` DROP FOREIGN KEY `Record_recordTypeId_fkey`;

-- AlterTable
ALTER TABLE `record` DROP COLUMN `recordTypeId`,
    ADD COLUMN `record_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_record_type_id_fkey` FOREIGN KEY (`record_type_id`) REFERENCES `RecordType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
