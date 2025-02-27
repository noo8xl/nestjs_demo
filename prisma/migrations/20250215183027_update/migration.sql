/*
  Warnings:

  - You are about to drop the column `back_side` on the `KycDocuments` table. All the data in the column will be lost.
  - You are about to drop the column `front_side` on the `KycDocuments` table. All the data in the column will be lost.
  - You are about to drop the column `selfie` on the `KycDocuments` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `KycDocuments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `KycDocuments` DROP COLUMN `back_side`,
    DROP COLUMN `front_side`,
    DROP COLUMN `selfie`,
    ADD COLUMN `file_path` VARCHAR(512) NOT NULL;
