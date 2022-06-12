/*
  Warnings:

  - You are about to drop the column `recordTypeId` on the `record` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `record` DROP FOREIGN KEY `Record_recordTypeId_fkey`;

-- AlterTable
ALTER TABLE `record` DROP COLUMN `recordTypeId`;
