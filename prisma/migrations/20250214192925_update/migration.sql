/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `CustomerDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `CustomerDetails` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `CustomerDetails` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `CustomerKYC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `house` on the `CustomerKYC` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CustomerKYC` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `CustomerKYC` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `country` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `zip_code` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(25)`.
  - You are about to alter the column `phone_number` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(25)`.
  - You are about to alter the column `state` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `room_number` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `UnsignedSmallInt` to `VarChar(10)`.
  - You are about to alter the column `customer_id` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `documents_id` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `province` on the `CustomerKYC` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - The primary key for the `CustomerParams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `CustomerParams` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `CustomerParams` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `CustomerTwoStep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `CustomerTwoStep` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `telegram_id` on the `CustomerTwoStep` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `CustomerTwoStep` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `KycDocuments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backSide` on the `KycDocuments` table. All the data in the column will be lost.
  - You are about to drop the column `frontSide` on the `KycDocuments` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `KycDocuments` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `KycDocuments` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `ReferalLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ReferalLink` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `ReferalLink` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `TwoStepCodeList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `TwoStepCodeList` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `customer_id` on the `TwoStepCodeList` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - Made the column `name` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `birth_date` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_number` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `back_side` to the `KycDocuments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_side` to the `KycDocuments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CustomerDetails` DROP FOREIGN KEY `CustomerDetails_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `CustomerKYC` DROP FOREIGN KEY `CustomerKYC_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `CustomerKYC` DROP FOREIGN KEY `CustomerKYC_documents_id_fkey`;

-- DropForeignKey
ALTER TABLE `CustomerParams` DROP FOREIGN KEY `CustomerParams_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `CustomerTwoStep` DROP FOREIGN KEY `CustomerTwoStep_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `KycDocuments` DROP FOREIGN KEY `KycDocuments_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReferalLink` DROP FOREIGN KEY `ReferalLink_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `TwoStepCodeList` DROP FOREIGN KEY `TwoStepCodeList_customer_id_fkey`;

-- DropIndex
DROP INDEX `CustomerKYC_customer_id_fkey` ON `CustomerKYC`;

-- DropIndex
DROP INDEX `CustomerKYC_documents_id_fkey` ON `CustomerKYC`;

-- DropIndex
DROP INDEX `CustomerTwoStep_customer_id_fkey` ON `CustomerTwoStep`;

-- DropIndex
DROP INDEX `KycDocuments_customer_id_fkey` ON `KycDocuments`;

-- DropIndex
DROP INDEX `ReferalLink_customer_id_fkey` ON `ReferalLink`;

-- DropIndex
DROP INDEX `TwoStepCodeList_customer_id_fkey` ON `TwoStepCodeList`;

-- AlterTable
ALTER TABLE `Customer` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `password` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CustomerDetails` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CustomerKYC` DROP PRIMARY KEY,
    DROP COLUMN `house`,
    DROP COLUMN `name`,
    DROP COLUMN `surname`,
    ADD COLUMN `birth_date` TIMESTAMP(6) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `house_number` VARCHAR(10) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(255) NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `second_name` VARCHAR(255) NOT NULL,
    MODIFY `country` VARCHAR(100) NOT NULL,
    MODIFY `street` VARCHAR(255) NOT NULL,
    MODIFY `zip_code` VARCHAR(25) NOT NULL,
    MODIFY `phone_number` VARCHAR(25) NOT NULL,
    MODIFY `state` VARCHAR(100) NOT NULL,
    MODIFY `room_number` VARCHAR(10) NOT NULL,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `documents_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `province` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CustomerParams` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CustomerTwoStep` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `telegram_id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `KycDocuments` DROP PRIMARY KEY,
    DROP COLUMN `backSide`,
    DROP COLUMN `frontSide`,
    ADD COLUMN `back_side` VARCHAR(512) NOT NULL,
    ADD COLUMN `front_side` VARCHAR(512) NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `selfie` VARCHAR(512) NOT NULL,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ReferalLink` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TwoStepCodeList` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `customer_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `CustomerDetails` ADD CONSTRAINT `CustomerDetails_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferalLink` ADD CONSTRAINT `ReferalLink_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerParams` ADD CONSTRAINT `CustomerParams_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerKYC` ADD CONSTRAINT `CustomerKYC_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerKYC` ADD CONSTRAINT `CustomerKYC_documents_id_fkey` FOREIGN KEY (`documents_id`) REFERENCES `KycDocuments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KycDocuments` ADD CONSTRAINT `KycDocuments_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTwoStep` ADD CONSTRAINT `CustomerTwoStep_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoStepCodeList` ADD CONSTRAINT `TwoStepCodeList_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
