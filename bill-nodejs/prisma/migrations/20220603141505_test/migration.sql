/*
  Warnings:

  - You are about to drop the column `record_type_id` on the `record` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `record` DROP FOREIGN KEY `Record_record_type_id_fkey`;

-- AlterTable
ALTER TABLE `record` DROP COLUMN `record_type_id`;

-- CreateTable
CREATE TABLE `_RecordToRecordType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RecordToRecordType_AB_unique`(`A`, `B`),
    INDEX `_RecordToRecordType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RecordToRecordType` ADD CONSTRAINT `_RecordToRecordType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Record`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecordToRecordType` ADD CONSTRAINT `_RecordToRecordType_B_fkey` FOREIGN KEY (`B`) REFERENCES `RecordType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
