/*
  Warnings:

  - You are about to drop the column `record_type_id` on the `record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recordTypeId]` on the table `Record` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recordTypeId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `record` DROP FOREIGN KEY `Record_record_type_id_fkey`;

-- AlterTable
ALTER TABLE `record` DROP COLUMN `record_type_id`,
    ADD COLUMN `recordTypeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Record_recordTypeId_key` ON `Record`(`recordTypeId`);

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_recordTypeId_fkey` FOREIGN KEY (`recordTypeId`) REFERENCES `RecordType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
